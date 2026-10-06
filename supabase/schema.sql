-- GeoRisk AI — Supabase PostgreSQL Schema with PostGIS & Row Level Security (RLS)
-- Run this script in the Supabase SQL Editor to initialize the database.

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
-- PostGIS extension enabled conditionally if supported by instance
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. Countries Table
CREATE TABLE IF NOT EXISTS public.countries (
    id TEXT PRIMARY KEY, -- ISO Alpha-3 e.g. 'IND', 'IRN', 'SAU'
    iso_code VARCHAR(3) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(255),
    crude_import_dependency_pct FLOAT DEFAULT 0.0,
    strategic_petroleum_reserve_days INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Data Sources Table
CREATE TABLE IF NOT EXISTS public.sources (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT,
    source_type VARCHAR(100) NOT NULL,
    reliability_notes TEXT,
    last_checked TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Active',
    classification VARCHAR(50) DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Geopolitical Events Table
CREATE TABLE IF NOT EXISTS public.geopolitical_events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_type VARCHAR(100) NOT NULL, -- maritime, conflict, infrastructure, sanctions
    severity FLOAT NOT NULL CHECK (severity >= 0.0 AND severity <= 10.0),
    confidence FLOAT NOT NULL CHECK (confidence >= 0.0 AND confidence <= 1.0),
    country_id TEXT REFERENCES public.countries(id),
    latitude FLOAT,
    longitude FLOAT,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    source_url TEXT,
    source_name TEXT,
    source_published_at TIMESTAMPTZ,
    source_hash VARCHAR(64) UNIQUE, -- SHA256 deduplication hash
    affected_commodities JSONB DEFAULT '[]'::jsonb,
    actors JSONB DEFAULT '[]'::jsonb,
    evidence JSONB DEFAULT '[]'::jsonb,
    classification VARCHAR(50) DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Energy Flows Table
CREATE TABLE IF NOT EXISTS public.energy_flows (
    id TEXT PRIMARY KEY,
    origin_country_id TEXT REFERENCES public.countries(id),
    destination_country_id TEXT REFERENCES public.countries(id),
    commodity VARCHAR(100) NOT NULL,
    volume FLOAT DEFAULT 0.0,
    unit VARCHAR(50) DEFAULT 'bpd',
    period VARCHAR(50) DEFAULT 'daily',
    source TEXT,
    classification VARCHAR(50) DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Routes & Chokepoints Table
CREATE TABLE IF NOT EXISTS public.routes (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    route_type VARCHAR(100) DEFAULT 'maritime',
    chokepoint_ids JSONB DEFAULT '[]'::jsonb,
    additional_transit_days FLOAT DEFAULT 0.0,
    status VARCHAR(50) DEFAULT 'Active',
    classification VARCHAR(50) DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Risk Assessments Table (Deterministic Engine Output)
CREATE TABLE IF NOT EXISTS public.risk_assessments (
    id TEXT PRIMARY KEY,
    event_id TEXT REFERENCES public.geopolitical_events(id) ON DELETE CASCADE,
    country_id TEXT REFERENCES public.countries(id),
    risk_score INT NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    threat_level VARCHAR(50) NOT NULL, -- Low, Moderate, Elevated, High
    severity_component FLOAT NOT NULL,
    exposure_component FLOAT NOT NULL,
    dependency_component FLOAT NOT NULL,
    duration_component FLOAT NOT NULL,
    confidence FLOAT DEFAULT 0.9,
    formula_version VARCHAR(50) DEFAULT 'v1.0-deterministic',
    classification VARCHAR(50) DEFAULT 'DERIVED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Supply Impact Assessments Table (Deterministic Engine Output)
CREATE TABLE IF NOT EXISTS public.supply_impacts (
    id TEXT PRIMARY KEY,
    event_id TEXT REFERENCES public.geopolitical_events(id) ON DELETE CASCADE,
    country_id TEXT REFERENCES public.countries(id),
    commodity VARCHAR(100) NOT NULL,
    baseline_volume FLOAT NOT NULL,
    estimated_loss FLOAT NOT NULL,
    loss_percentage FLOAT NOT NULL,
    concentration_index FLOAT NOT NULL, -- Normalized HHI (0-100)
    route_exposure_pct FLOAT DEFAULT 0.0,
    projected_delay_days FLOAT DEFAULT 0.0,
    reserve_runway_days INT DEFAULT 0,
    price_pressure_proxy VARCHAR(100) DEFAULT 'MODERATE (MODELLED)',
    classification VARCHAR(50) DEFAULT 'DERIVED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Scenarios Table (What-If Stress Testing)
CREATE TABLE IF NOT EXISTS public.scenarios (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_id TEXT REFERENCES public.countries(id),
    parameters JSONB NOT NULL,
    result JSONB NOT NULL,
    classification VARCHAR(50) DEFAULT 'ASSUMPTION',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. AI Conversations Table (Grounded Gemini Log)
CREATE TABLE IF NOT EXISTS public.ai_conversations (
    id TEXT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    user_message TEXT NOT NULL,
    assistant_message TEXT NOT NULL,
    context JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_events_country ON public.geopolitical_events(country_id);
CREATE INDEX IF NOT EXISTS idx_events_start_time ON public.geopolitical_events(start_time DESC);
CREATE INDEX IF NOT EXISTS idx_events_source_hash ON public.geopolitical_events(source_hash);
CREATE INDEX IF NOT EXISTS idx_risk_score ON public.risk_assessments(risk_score DESC);
CREATE INDEX IF NOT EXISTS idx_supply_impact_country ON public.supply_impacts(country_id);

-- 12. Row Level Security (RLS) Policies
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.geopolitical_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.energy_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supply_impacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access for Analytics Data
CREATE POLICY "Allow public read access on countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Allow public read access on sources" ON public.sources FOR SELECT USING (true);
CREATE POLICY "Allow public read access on geopolitical_events" ON public.geopolitical_events FOR SELECT USING (true);
CREATE POLICY "Allow public read access on energy_flows" ON public.energy_flows FOR SELECT USING (true);
CREATE POLICY "Allow public read access on routes" ON public.routes FOR SELECT USING (true);
CREATE POLICY "Allow public read access on risk_assessments" ON public.risk_assessments FOR SELECT USING (true);
CREATE POLICY "Allow public read access on supply_impacts" ON public.supply_impacts FOR SELECT USING (true);
CREATE POLICY "Allow public read access on scenarios" ON public.scenarios FOR SELECT USING (true);
CREATE POLICY "Allow public read access on ai_conversations" ON public.ai_conversations FOR SELECT USING (true);

-- Allow Service Role Write Access
CREATE POLICY "Allow service role insert on geopolitical_events" ON public.geopolitical_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role update on geopolitical_events" ON public.geopolitical_events FOR UPDATE USING (true);
CREATE POLICY "Allow service role insert on risk_assessments" ON public.risk_assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role insert on supply_impacts" ON public.supply_impacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role insert on scenarios" ON public.scenarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role insert on ai_conversations" ON public.ai_conversations FOR INSERT WITH CHECK (true);
