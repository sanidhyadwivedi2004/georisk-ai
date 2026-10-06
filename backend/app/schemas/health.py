from pydantic import BaseModel
from typing import Dict, Any

class HealthResponse(BaseModel):
    status: str # "healthy", "degraded", "unhealthy"
    version: str
    environment: str
    demo_mode: bool
    services: Dict[str, str]
