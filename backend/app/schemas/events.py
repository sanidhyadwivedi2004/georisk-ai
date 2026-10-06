from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class EventBase(BaseModel):
    title: str
    event_type: str
    severity: float = Field(..., ge=0.0, le=10.0)
    confidence: float = Field(..., ge=0.0, le=1.0)
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    timestamp: datetime
    summary: str
    evidence: List[str] = []
    affected_commodities: List[str] = []
    actors: List[str] = []
    source: str
    source_url: Optional[str] = None
    data_classification: str = "VERIFIED"

class EventCreate(EventBase):
    id: str

class EventOut(EventBase):
    id: str

    class Config:
        from_attributes = True
