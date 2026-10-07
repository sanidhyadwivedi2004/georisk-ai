from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.sources import DataSourceOut

router = APIRouter()

MOCK_SOURCES = [
    {
        "id": "src-gdelt-01",
        "name": "GDELT Project (Global Event Database)",
        "category": "Geopolitical News Discovery",
        "status": "Active (5-Min Sync)",
        "last_update": "12 mins ago",
        "reliability_score": 96.5,
        "url": "https://blog.gdeltproject.org/",
        "description": "Real-time automated global news extraction, event coding, and tone monitoring across 100+ languages.",
        "classification": "VERIFIED"
    },
    {
        "id": "src-eia-02",
        "name": "U.S. Energy Information Administration (EIA)",
        "category": "Energy Statistics & Production",
        "status": "Active (Daily Sync)",
        "last_update": "1 hour ago",
        "reliability_score": 99.0,
        "url": "https://www.eia.gov/",
        "description": "Authoritative global crude oil production, refined product inventories, and international energy movement flows.",
        "classification": "VERIFIED"
    },
    {
        "id": "src-comtrade-03",
        "name": "UN Comtrade Database",
        "category": "International Bilateral Trade",
        "status": "Active (Monthly Sync)",
        "last_update": "3 hours ago",
        "reliability_score": 98.2,
        "url": "https://comtradeplus.un.org/",
        "description": "United Nations detailed bilateral trade matrix for HS-27 petroleum commodities and crude oil imports.",
        "classification": "VERIFIED"
    },
    {
        "id": "src-ofac-04",
        "name": "U.S. OFAC Sanctions List",
        "category": "Regulatory & Sanctions Compliance",
        "status": "Active (Real-time Sync)",
        "last_update": "25 mins ago",
        "reliability_score": 99.5,
        "url": "https://sanctionssearch.ofac.treas.gov/",
        "description": "SDN List monitoring for sanctioned oil tankers, maritime management entities, and prohibited ports.",
        "classification": "VERIFIED"
    },
    {
        "id": "src-wb-05",
        "name": "World Bank Data API",
        "category": "Macroeconomic Indicators",
        "status": "Active (Quarterly Sync)",
        "last_update": "4 hours ago",
        "reliability_score": 97.0,
        "url": "https://data.worldbank.org/",
        "description": "Country-level macroeconomic resilience metrics, GDP energy intensity, and import dependency ratios.",
        "classification": "VERIFIED"
    },
    {
        "id": "src-gem-06",
        "name": "Global Energy Monitor (GEM)",
        "category": "Asset Spatial Geometries",
        "status": "Active (Weekly Sync)",
        "last_update": "2 days ago",
        "reliability_score": 95.8,
        "url": "https://globalenergymonitor.org/",
        "description": "Spatial coordinate geometry for crude pipelines, oil terminals, refineries, and LNG export facilities.",
        "classification": "VERIFIED"
    },
    {
        "id": "src-osm-07",
        "name": "OpenStreetMap Maritime Vector Boundaries",
        "category": "Cartographic Basemap & Ports",
        "status": "Active (Local Vector Cache)",
        "last_update": "1 day ago",
        "reliability_score": 98.0,
        "url": "https://www.openstreetmap.org/",
        "description": "High-density maritime boundaries, port geometries, and navigation channel spatial polygons.",
        "classification": "VERIFIED"
    }
]

@router.get("/sources", response_model=List[DataSourceOut])
def list_data_sources(db: Session = Depends(get_db)):
    return MOCK_SOURCES

@router.get("/sources/{id}", response_model=DataSourceOut)
def get_data_source(id: str, db: Session = Depends(get_db)):
    for s in MOCK_SOURCES:
        if s["id"] == id:
            return s
    raise HTTPException(status_code=404, detail="Data source not found")
