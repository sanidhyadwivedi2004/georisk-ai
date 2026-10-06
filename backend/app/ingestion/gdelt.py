import hashlib
import httpx
import logging
from datetime import datetime
from typing import List, Dict, Any

logger = logging.getLogger("georisk.ingestion.gdelt")

def compute_source_hash(source_name: str, source_url: str, published_at: str) -> str:
    raw = f"{source_name.strip().lower()}|{source_url.strip().lower()}|{published_at.strip()}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()

def fetch_gdelt_news(query: str = "Hormuz OR Bab-el-Mandeb OR (oil tanker attack)", max_records: int = 5) -> List[Dict[str, Any]]:
    url = "https://api.gdeltproject.org/api/v2/doc/doc"
    params = {
        "query": query,
        "mode": "artlist",
        "maxrecords": max_records,
        "format": "json"
    }
    
    parsed = []
    try:
        with httpx.Client(timeout=6.0) as client:
            resp = client.get(url, params=params)
            if resp.status_code == 200:
                articles = resp.json().get("articles", [])
                for a in articles:
                    title = a.get("title", "")
                    domain = a.get("domain", "GDELT")
                    source_url = a.get("url", "")
                    seendate = a.get("seendate", datetime.utcnow().strftime("%Y%m%d%H%M%S"))
                    
                    s_hash = compute_source_hash(domain, source_url, seendate)
                    
                    parsed.append({
                        "id": f"evt-gdelt-{s_hash[:8]}",
                        "title": title,
                        "description": f"Real-time news report from {domain}: {title}",
                        "event_type": "maritime" if "tanker" in title.lower() or "hormuz" in title.lower() else "conflict",
                        "severity": 7.5,
                        "confidence": 0.90,
                        "country_id": "IND",
                        "latitude": 26.5667,
                        "longitude": 56.2500,
                        "start_time": datetime.utcnow().isoformat(),
                        "source_url": source_url,
                        "source_name": domain,
                        "source_published_at": datetime.utcnow().isoformat(),
                        "source_hash": s_hash,
                        "classification": "VERIFIED"
                    })
    except Exception as e:
        logger.warning(f"GDELT fetch error: {e}")
        
    return parsed
