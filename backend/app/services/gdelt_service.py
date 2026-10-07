"""
GDELT Ingestion Service
Discovers geopolitical maritime and energy event news articles from GDELT API and normalizes them into database records.
"""

import httpx
import logging
from datetime import datetime
from typing import List, Dict, Any
from app.config import settings

logger = logging.getLogger("georisk.gdelt")

GDELT_QUERY = "Hormuz OR Bab-el-Mandeb OR (oil tanker seizure) OR (Persian Gulf maritime attack)"

def fetch_gdelt_articles(query: str = GDELT_QUERY, max_records: int = 5) -> List[Dict[str, Any]]:
    """
    Fetch raw articles from GDELT DOC API with timeout and fallback.
    """
    params = {
        "query": query,
        "mode": "artlist",
        "maxrecords": max_records,
        "format": "json"
    }
    
    try:
        with httpx.Client(timeout=6.0) as client:
            resp = client.get("https://api.gdeltproject.org/api/v2/doc/doc", params=params)
            if resp.status_code == 200:
                data = resp.json()
                articles = data.get("articles", [])
                logger.info(f"Fetched {len(articles)} raw articles from GDELT")
                return articles
    except Exception as e:
        logger.warning(f"GDELT API request failed or timed out: {e}. Using cached/demo ingestion pipeline.")
        
    return []
