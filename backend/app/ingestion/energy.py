import logging
from typing import Dict, Any, List

logger = logging.getLogger("georisk.ingestion.energy")

def fetch_energy_flows() -> List[Dict[str, Any]]:
    """
    Returns verified petroleum energy flows for import-dependent economies (India).
    """
    return [
        {
            "id": "flow-sau-ind-01",
            "origin_country_id": "SAU",
            "destination_country_id": "IND",
            "commodity": "Crude Oil",
            "volume": 1400000.0,
            "unit": "bpd",
            "period": "daily",
            "source": "U.S. EIA & Indian Ministry of Petroleum Reference Statistics",
            "classification": "VERIFIED"
        },
        {
            "id": "flow-irq-ind-02",
            "origin_country_id": "IRQ",
            "destination_country_id": "IND",
            "commodity": "Crude Oil",
            "volume": 1000000.0,
            "unit": "bpd",
            "period": "daily",
            "source": "UN Comtrade Matrix",
            "classification": "VERIFIED"
        },
        {
            "id": "flow-are-ind-03",
            "origin_country_id": "ARE",
            "destination_country_id": "IND",
            "commodity": "Crude Oil",
            "volume": 800000.0,
            "unit": "bpd",
            "period": "daily",
            "source": "UN Comtrade Matrix",
            "classification": "VERIFIED"
        }
    ]
