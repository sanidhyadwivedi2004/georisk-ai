from pydantic import BaseModel
from typing import Optional

class DataSourceOut(BaseModel):
    id: str
    name: str
    category: str
    status: str
    last_update: Optional[str] = None
    reliability_score: float
    url: Optional[str] = None
    description: Optional[str] = None
    classification: str = "VERIFIED"

    class Config:
        from_attributes = True
