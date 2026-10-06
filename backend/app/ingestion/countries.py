from typing import List, Dict, Any

def get_canonical_country_registry() -> List[Dict[str, Any]]:
    return [
        {
            "id": "IND",
            "iso_code": "IND",
            "name": "India",
            "region": "South Asia",
            "crude_import_dependency_pct": 87.8,
            "strategic_petroleum_reserve_days": 74
        },
        {
            "id": "IRN",
            "iso_code": "IRN",
            "name": "Iran",
            "region": "Middle East",
            "crude_import_dependency_pct": 0.0,
            "strategic_petroleum_reserve_days": 180
        },
        {
            "id": "SAU",
            "iso_code": "SAU",
            "name": "Saudi Arabia",
            "region": "Middle East",
            "crude_import_dependency_pct": 0.0,
            "strategic_petroleum_reserve_days": 180
        },
        {
            "id": "USA",
            "iso_code": "USA",
            "name": "United States",
            "region": "North America",
            "crude_import_dependency_pct": 15.0,
            "strategic_petroleum_reserve_days": 90
        }
    ]
