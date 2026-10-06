import os
from dotenv import load_dotenv
from pydantic import BaseModel

# Explicitly load .env file from root or backend directory
load_dotenv()
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))

class Settings(BaseModel):
    APP_NAME: str = "GeoRisk AI Backend"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Database (Supabase PostgreSQL / PostGIS or SQLite fallback)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./georisk.db")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")
    SUPABASE_SERVICE_ROLE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    
    # LLM Provider Selection: "deepseek", "gemini", "ollama", or "auto"
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "auto").lower()
    
    # AI API Keys
    DEEPSEEK_API_KEY: str = os.getenv("DEEPSEEK_API_KEY", "")
    DEEPSEEK_BASE_URL: str = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com")
    DEEPSEEK_MODEL: str = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")
    
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # External Data APIs
    NEWS_API_KEY: str = os.getenv("NEWS_API_KEY", "")
    EIA_API_KEY: str = os.getenv("EIA_API_KEY", "")
    UN_COMTRADE_API_KEY: str = os.getenv("UN_COMTRADE_API_KEY", "")
    GDELT_BASE_URL: str = os.getenv("GDELT_BASE_URL", "https://api.gdeltproject.org/api/v2/doc/doc")
    WORLD_BANK_BASE_URL: str = os.getenv("WORLD_BANK_BASE_URL", "https://api.worldbank.org/v2")
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: str = os.getenv("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", "")
    
    # Local Ollama LLM Configuration
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama3.2")
    
    # Application Flags
    DEMO_MODE: bool = os.getenv("DEMO_MODE", "true").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "georisk-ai-backend-secret-key-change-in-production")

settings = Settings()
