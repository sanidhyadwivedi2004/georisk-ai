import httpx
import logging
from typing import List, Dict, Any
from app.config import settings
from app.ingestion.gdelt import compute_source_hash

logger = logging.getLogger("georisk.ingestion.news")

def fetch_news_api(query: str = "oil shipping OR energy corridor", max_records: int = 5) -> List[Dict[str, Any]]:
    if not settings.NEWS_API_KEY:
        logger.info("NEWS_API_KEY not configured. Skipping NewsAPI fetch.")
        return []
        
    url = f"https://newsapi.org/v2/everything?q={query}&pageSize={max_records}&apiKey={settings.NEWS_API_KEY}"
    parsed = []
    try:
        with httpx.Client(timeout=5.0) as client:
            res = client.get(url)
            if res.status_code == 200:
                articles = res.json().get("articles", [])
                for a in articles:
                    title = a.get("title", "")
                    src = a.get("source", {}).get("name", "NewsAPI")
                    s_url = a.get("url", "")
                    pub = a.get("publishedAt", "")
                    s_hash = compute_source_hash(src, s_url, pub)
                    
                    parsed.append({
                        "id": f"evt-newsapi-{s_hash[:8]}",
                        "title": title,
                        "description": a.get("description", title),
                        "event_type": "maritime",
                        "severity": 7.0,
                        "confidence": 0.85,
                        "country_id": "IND",
                        "latitude": 26.5667,
                        "longitude": 56.2500,
                        "start_time": pub or datetime.utcnow().isoformat(),
                        "source_url": s_url,
                        "source_name": src,
                        "source_published_at": pub,
                        "source_hash": s_hash,
                        "classification": "VERIFIED"
                    })
    except Exception as e:
        logger.warning(f"NewsAPI fetch error: {e}")
        
    return parsed
