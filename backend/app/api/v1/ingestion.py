from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.ingestion.gdelt import fetch_gdelt_news
from app.ingestion.news import fetch_news_api
from datetime import datetime

router = APIRouter()

@router.post("/ingestion/news")
def trigger_news_ingestion(db: Session = Depends(get_db)):
    gdelt_records = fetch_gdelt_news(max_records=5)
    newsapi_records = fetch_news_api(max_records=3)
    
    all_ingested = gdelt_records + newsapi_records
    
    return {
        "status": "Success",
        "ingested_count": len(all_ingested),
        "sources": ["GDELT DOC API", "NewsAPI"],
        "deduplicated_hashes": [r["source_hash"] for r in all_ingested],
        "timestamp": datetime.utcnow().isoformat()
    }
