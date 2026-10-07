import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'backend')))

from app.services.entity_resolution import resolve_country, resolve_chokepoint, resolve_commodity

def test_resolve_country():
    assert resolve_country("Islamic Republic of Iran") == "IRN"
    assert resolve_country("Iran") == "IRN"
    assert resolve_country("IR") == "IRN"
    assert resolve_country("India") == "IND"
    assert resolve_country("KSA") == "SAU"

def test_resolve_chokepoint():
    assert resolve_chokepoint("Strait of Hormuz") == "chk-hormuz"
    assert resolve_chokepoint("HORMUZ") == "chk-hormuz"

def test_resolve_commodity():
    assert resolve_commodity("Brent") == "Crude Oil"
    assert resolve_commodity("LNG") == "Liquefied Natural Gas"
