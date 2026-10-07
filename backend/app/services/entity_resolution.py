"""
Canonical Entity Resolution Service
Normalizes variant names of countries, chokepoints, commodities, ports, and suppliers into canonical ISO / UN standards.
"""

COUNTRY_ALIAS_MAP = {
    "IRAN": "IRN",
    "ISLAMIC REPUBLIC OF IRAN": "IRN",
    "IR": "IRN",
    "INDIA": "IND",
    "IN": "IND",
    "REPUBLIC OF INDIA": "IND",
    "SAUDI ARABIA": "SAU",
    "KSA": "SAU",
    "KINGDOM OF SAUDI ARABIA": "SAU",
    "UNITED ARAB EMIRATES": "ARE",
    "UAE": "ARE",
    "QATAR": "QAT",
    "IRAQ": "IRQ",
    "KUWAIT": "KWT",
    "UNITED STATES": "USA",
    "US": "USA",
    "USA": "USA",
    "RUSSIA": "RUS",
    "RUSSIAN FEDERATION": "RUS",
    "CHINA": "CHN",
    "PRC": "CHN",
}

CHOKEPOINT_ALIAS_MAP = {
    "STRAIT OF HORMUZ": "chk-hormuz",
    "HORMUZ": "chk-hormuz",
    "HORMUZ STRAIT": "chk-hormuz",
    "BAB EL-MANDEB": "chk-bab-el-mandeb",
    "BAB-EL-MANDEB": "chk-bab-el-mandeb",
    "BAB EL MANDEB": "chk-bab-el-mandeb",
    "STRAIT OF MALACCA": "chk-malacca",
    "MALACCA": "chk-malacca",
    "MALACCA STRAIT": "chk-malacca",
    "SUEZ CANAL": "chk-suez",
    "SUEZ": "chk-suez",
}

COMMODITY_ALIAS_MAP = {
    "CRUDE": "Crude Oil",
    "CRUDE OIL": "Crude Oil",
    "PETROLEUM": "Crude Oil",
    "BRENT": "Crude Oil",
    "WTI": "Crude Oil",
    "LNG": "Liquefied Natural Gas",
    "LIQUEFIED NATURAL GAS": "Liquefied Natural Gas",
    "NATURAL GAS": "Liquefied Natural Gas",
    "DIESEL": "Refined Petroleum Products",
    "GASOLINE": "Refined Petroleum Products",
}

def resolve_country(raw_name: str) -> str:
    cleaned = raw_name.strip().upper()
    return COUNTRY_ALIAS_MAP.get(cleaned, cleaned)

def resolve_chokepoint(raw_name: str) -> str:
    cleaned = raw_name.strip().upper()
    return CHOKEPOINT_ALIAS_MAP.get(cleaned, cleaned)

def resolve_commodity(raw_name: str) -> str:
    cleaned = raw_name.strip().upper()
    return COMMODITY_ALIAS_MAP.get(cleaned, raw_name.strip())
