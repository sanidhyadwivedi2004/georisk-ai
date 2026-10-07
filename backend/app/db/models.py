from sqlalchemy import Column, String, Integer, Float, Text, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Country(Base):
    __tablename__ = "countries"
    
    id = Column(String, primary_key=True, index=True) # ISO alpha-3 e.g. "IND", "IRN", "SAU"
    name = Column(String, nullable=False)
    region = Column(String, nullable=True)
    crude_import_dependency_pct = Column(Float, default=0.0)
    strategic_petroleum_reserve_days = Column(Integer, default=0)
    data_status = Column(String, default="VERIFIED") # VERIFIED, DERIVED, ASSUMPTION, DEMO
    created_at = Column(DateTime, default=datetime.utcnow)

class DataSourceModel(Base):
    __tablename__ = "sources"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    status = Column(String, default="Active")
    last_update = Column(String, nullable=True)
    reliability_score = Column(Float, default=95.0)
    url = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    classification = Column(String, default="VERIFIED")
    retrieved_at = Column(DateTime, default=datetime.utcnow)

class Article(Base):
    __tablename__ = "articles"
    
    id = Column(String, primary_key=True, index=True)
    source_id = Column(String, ForeignKey("sources.id"), nullable=True)
    title = Column(String, nullable=False)
    source_url = Column(String, nullable=True)
    published_at = Column(DateTime, default=datetime.utcnow)
    retrieved_at = Column(DateTime, default=datetime.utcnow)
    raw_content = Column(Text, nullable=True)
    dataset_version = Column(String, default="v1.0")
    data_status = Column(String, default="VERIFIED")

class Event(Base):
    __tablename__ = "events"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    event_type = Column(String, nullable=False) # maritime, conflict, infrastructure, sanctions
    severity = Column(Float, nullable=False) # 1.0 - 10.0
    confidence = Column(Float, nullable=False) # 0.0 - 1.0
    location = Column(String, nullable=False)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    summary = Column(Text, nullable=False)
    evidence = Column(JSON, default=list) # List of strings
    affected_commodities = Column(JSON, default=list) # e.g. ["Crude Oil", "LNG"]
    actors = Column(JSON, default=list)
    source = Column(String, nullable=False)
    source_url = Column(String, nullable=True)
    data_classification = Column(String, default="VERIFIED")
    
    risk_assessment = relationship("RiskAssessment", back_populates="event", uselist=False)
    impact_assessment = relationship("ImpactAssessment", back_populates="event", uselist=False)

class EventEntity(Base):
    __tablename__ = "event_entities"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    entity_name = Column(String, nullable=False)
    entity_type = Column(String, nullable=False) # Country, Port, Vessel, Organization
    canonical_id = Column(String, nullable=True)

class Supplier(Base):
    __tablename__ = "suppliers"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    country_code = Column(String, nullable=False)
    market_share_pct = Column(Float, default=0.0)
    primary_commodity = Column(String, default="Crude Oil")
    data_status = Column(String, default="VERIFIED")

class EnergyFlow(Base):
    __tablename__ = "energy_flows"
    
    id = Column(String, primary_key=True, index=True)
    origin_country = Column(String, nullable=False)
    destination_country = Column(String, nullable=False)
    commodity = Column(String, nullable=False)
    volume_bpd = Column(Float, default=0.0)
    primary_chokepoint = Column(String, nullable=True)
    data_status = Column(String, default="VERIFIED")

class Port(Base):
    __tablename__ = "ports"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    country_code = Column(String, nullable=False)
    port_type = Column(String, nullable=False) # export_terminal, import_port
    capacity_bpd = Column(Float, default=0.0)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    status = Column(String, default="Operational")
    data_status = Column(String, default="VERIFIED")

class Route(Base):
    __tablename__ = "routes"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    origin = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    chokepoints = Column(JSON, default=list) # List of chokepoint IDs
    status = Column(String, default="Active")
    additional_transit_days_if_rerouted = Column(Float, default=0.0)
    data_status = Column(String, default="VERIFIED")

class Chokepoint(Base):
    __tablename__ = "chokepoints"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    daily_oil_flow_mbpd = Column(Float, default=0.0)
    vulnerability_rating = Column(Float, default=0.0) # 0-100
    status = Column(String, default="Operational")
    data_status = Column(String, default="VERIFIED")

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"
    
    id = Column(String, primary_key=True, index=True)
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    overall_risk_score = Column(Integer, nullable=False) # 0-100
    threat_level = Column(String, nullable=False) # CRITICAL, ELEVATED, MODERATE, LOW
    confidence_score = Column(Float, nullable=False)
    
    # Deterministic inputs & components
    threat_severity = Column(Float, nullable=False)
    event_probability = Column(Float, nullable=False)
    asset_exposure = Column(Float, nullable=False)
    chokepoint_criticality = Column(Float, nullable=False)
    alternative_route_gap = Column(Float, nullable=False)
    
    formula_version = Column(String, default="v1.0-deterministic")
    input_parameters = Column(JSON, default=dict)
    weights = Column(JSON, default=dict)
    timestamp = Column(DateTime, default=datetime.utcnow)
    data_classification = Column(String, default="DERIVED")
    
    event = relationship("Event", back_populates="risk_assessment")

class ImpactAssessment(Base):
    __tablename__ = "impact_assessments"
    
    id = Column(String, primary_key=True, index=True)
    event_id = Column(String, ForeignKey("events.id"), nullable=False)
    target_country = Column(String, nullable=False, default="India")
    commodity = Column(String, nullable=False, default="Crude Oil")
    
    import_exposure_pct = Column(Float, nullable=False)
    supplier_concentration_hhi = Column(Float, nullable=False)
    route_exposure_pct = Column(Float, nullable=False)
    potential_disruption_bpd = Column(Float, nullable=False)
    projected_delay_days = Column(Float, nullable=False)
    reserve_runway_days = Column(Integer, nullable=False)
    price_pressure_proxy = Column(String, nullable=False) # HIGH, MODERATE, LOW (labeled MODELLED)
    
    data_classification = Column(String, default="DERIVED")
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    event = relationship("Event", back_populates="impact_assessment")

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(String, primary_key=True, index=True)
    event_id = Column(String, ForeignKey("events.id"), nullable=True)
    action = Column(String, nullable=False)
    priority = Column(String, nullable=False) # HIGH, MEDIUM, LOW
    reason = Column(Text, nullable=False)
    trigger = Column(String, nullable=False)
    evidence = Column(JSON, default=list)
    expected_effect = Column(String, nullable=False)
    data_classification = Column(String, default="DERIVED")
    created_at = Column(DateTime, default=datetime.utcnow)

class Scenario(Base):
    __tablename__ = "scenarios"
    
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    target_country = Column(String, default="India")
    commodity = Column(String, default="Crude Oil")
    duration_days = Column(Integer, nullable=False)
    disruption_percent = Column(Float, nullable=False)
    alternative_supply_capacity_bpd = Column(Float, default=0.0)
    route_availability_pct = Column(Float, default=100.0)
    reserve_coverage_days = Column(Integer, default=74)
    data_classification = Column(String, default="ASSUMPTION")
    created_at = Column(DateTime, default=datetime.utcnow)

class ScenarioResult(Base):
    __tablename__ = "scenario_results"
    
    id = Column(String, primary_key=True, index=True)
    scenario_id = Column(String, ForeignKey("scenarios.id"), nullable=False)
    baseline_risk = Column(Integer, nullable=False)
    simulated_risk = Column(Integer, nullable=False)
    baseline_exposure_pct = Column(Float, nullable=False)
    simulated_exposure_pct = Column(Float, nullable=False)
    projected_volume_loss_bpd = Column(Float, nullable=False)
    simulated_delay_days = Column(Float, nullable=False)
    remaining_reserve_days = Column(Integer, nullable=False)
    mitigation_urgency = Column(String, nullable=False)
    calculated_at = Column(DateTime, default=datetime.utcnow)
