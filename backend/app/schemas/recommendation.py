from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class RecommendationOut(BaseModel):
    id: str
    event_id: Optional[str] = None
    action: str
    priority: str
    reason: str
    trigger: str
    evidence: List[str] = []
    expected_effect: str
    data_classification: str = "DERIVED"
    created_at: datetime

    class Config:
        from_attributes = True
