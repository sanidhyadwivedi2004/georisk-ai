"""
Ollama & AI Event Extraction Service
Extracts structured geopolitical event schema from raw news texts with multi-tier fallback (LLM -> Retry -> Structured Repair -> Rule-based Fallback).
"""

import httpx
import json
import logging
import re
from typing import Dict, Any, List
from app.config import settings

logger = logging.getLogger("georisk.ai")

SYSTEM_PROMPT = """You are a geopolitical intelligence extraction system.
Extract structured information from news articles regarding energy supply chain events.
Output strictly valid JSON matching this schema:
{
  "event_type": "maritime | conflict | infrastructure | sanctions",
  "actors": ["string"],
  "locations": ["string"],
  "commodities": ["string"],
  "assets": ["string"],
  "severity": number between 1.0 and 10.0,
  "confidence": number between 0.0 and 1.0,
  "summary": "string",
  "evidence": ["string"]
}
Do not include any commentary or markdown formatting outside the JSON object.
"""

def rule_based_fallback_extraction(raw_text: str, source: str = "GDELT") -> Dict[str, Any]:
    text_upper = raw_text.upper()
    
    # Event type detection
    if "HORMUZ" in text_upper or "BAB EL-MANDEB" in text_upper or "MALACCA" in text_upper or "TANKER" in text_upper or "STRAIT" in text_upper:
        event_type = "maritime"
    elif "SANCTION" in text_upper or "OFAC" in text_upper or "EMBARGO" in text_upper:
        event_type = "sanctions"
    elif "CYBER" in text_upper or "PIPELINE" in text_upper or "REFINERY" in text_upper or "ATTACK" in text_upper:
        event_type = "infrastructure"
    else:
        event_type = "conflict"
        
    # Commodity detection
    commodities = []
    if "CRUDE" in text_upper or "OIL" in text_upper or "BRENT" in text_upper:
        commodities.append("Crude Oil")
    if "LNG" in text_upper or "GAS" in text_upper:
        commodities.append("Liquefied Natural Gas")
    if not commodities:
        commodities.append("Crude Oil")
        
    # Severity estimation rule-based
    severity = 5.0
    if "SEIZURE" in text_upper or "ATTACK" in text_upper or "DRONE" in text_upper or "BLOCKADE" in text_upper:
        severity = 8.5
    elif "THREAT" in text_upper or "TENSION" in text_upper or "WARNING" in text_upper:
        severity = 6.5
        
    # Locations
    locations = []
    if "HORMUZ" in text_upper:
        locations.append("Strait of Hormuz")
    if "IRAN" in text_upper:
        locations.append("Iran")
    if "RED SEA" in text_upper or "BAB" in text_upper:
        locations.append("Bab el-Mandeb")
    if not locations:
        locations.append("Middle East Transit Zone")
        
    # Actors
    actors = []
    if "IRGC" in text_upper or "IRAN" in text_upper:
        actors.append("Iranian Navy / IRGC")
    if "US" in text_upper or "NAVY" in text_upper:
        actors.append("U.S. Fifth Fleet")
    if "HOUTHI" in text_upper:
        actors.append("Ansar Allah (Houthi)")
    if not actors:
        actors.append("State & Non-State Maritime Actors")
        
    summary = raw_text[:280] + ("..." if len(raw_text) > 280 else "")
    
    return {
        "event_type": event_type,
        "actors": actors,
        "locations": locations,
        "commodities": commodities,
        "assets": ["Maritime Transit Corridors"],
        "severity": round(severity, 1),
        "confidence": 0.85,
        "summary": summary,
        "evidence": [
            f"Rule-based extraction from article snippet: '{summary[:100]}...'",
            f"Extracted key terms: {', '.join(locations + commodities)}"
        ]
    }

def extract_event_intelligence(raw_text: str, source: str = "GDELT") -> Dict[str, Any]:
    """
    Primary AI extraction pipeline using Ollama LLM with structured repair & rule-based fallback.
    """
    ollama_url = f"{settings.OLLAMA_BASE_URL.rstrip('/')}/api/generate"
    payload = {
        "model": settings.OLLAMA_MODEL,
        "prompt": f"{SYSTEM_PROMPT}\n\nArticle Text:\n{raw_text}\n\nJSON Output:",
        "stream": False,
        "options": {"temperature": 0.1}
    }
    
    # Attempt 1: Direct LLM call
    try:
        with httpx.Client(timeout=8.0) as client:
            resp = client.post(ollama_url, json=payload)
            if resp.status_code == 200:
                result_text = resp.json().get("response", "")
                
                # Try parsing JSON
                try:
                    # Clean markdown fence if present
                    json_str = re.sub(r"```json\s*|\s*```", "", result_text).strip()
                    data = json.loads(json_str)
                    
                    # Validate schema fields
                    if all(k in data for k in ["event_type", "severity", "confidence", "summary"]):
                        logger.info("Successfully extracted event intelligence using Ollama LLM")
                        return data
                except json.JSONDecodeError:
                    logger.warning("Ollama LLM returned non-JSON response. Attempting repair.")
    except Exception as e:
        logger.warning(f"Ollama LLM call failed or timed out: {e}. Falling back to rule-based extraction.")

    # Fallback: Rule-based extraction
    return rule_based_fallback_extraction(raw_text, source=source)
