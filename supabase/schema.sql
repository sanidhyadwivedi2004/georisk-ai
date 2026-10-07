CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "postgis";

CREATE TABLE IF NOT EXISTS public.chokepoints (
	id VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	location VARCHAR NOT NULL,
	latitude FLOAT NOT NULL,
	longitude FLOAT NOT NULL,
	daily_oil_flow_mbpd FLOAT,
	vulnerability_rating FLOAT,
	status VARCHAR,
	data_status VARCHAR,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.countries (
	id VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	region VARCHAR,
	crude_import_dependency_pct FLOAT,
	strategic_petroleum_reserve_days INTEGER,
	data_status VARCHAR,
	created_at TIMESTAMP WITHOUT TIME ZONE,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.energy_flows (
	id VARCHAR NOT NULL,
	origin_country VARCHAR NOT NULL,
	destination_country VARCHAR NOT NULL,
	commodity VARCHAR NOT NULL,
	volume_bpd FLOAT,
	primary_chokepoint VARCHAR,
	data_status VARCHAR,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.events (
	id VARCHAR NOT NULL,
	title VARCHAR NOT NULL,
	event_type VARCHAR NOT NULL,
	severity FLOAT NOT NULL,
	confidence FLOAT NOT NULL,
	location VARCHAR NOT NULL,
	latitude FLOAT,
	longitude FLOAT,
	timestamp TIMESTAMP WITHOUT TIME ZONE,
	summary TEXT NOT NULL,
	evidence JSON,
	affected_commodities JSON,
	actors JSON,
	source VARCHAR NOT NULL,
	source_url VARCHAR,
	data_classification VARCHAR,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.ports (
	id VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	country_code VARCHAR NOT NULL,
	port_type VARCHAR NOT NULL,
	capacity_bpd FLOAT,
	latitude FLOAT,
	longitude FLOAT,
	status VARCHAR,
	data_status VARCHAR,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.routes (
	id VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	origin VARCHAR NOT NULL,
	destination VARCHAR NOT NULL,
	chokepoints JSON,
	status VARCHAR,
	additional_transit_days_if_rerouted FLOAT,
	data_status VARCHAR,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.scenarios (
	id VARCHAR NOT NULL,
	title VARCHAR NOT NULL,
	target_country VARCHAR,
	commodity VARCHAR,
	duration_days INTEGER NOT NULL,
	disruption_percent FLOAT NOT NULL,
	alternative_supply_capacity_bpd FLOAT,
	route_availability_pct FLOAT,
	reserve_coverage_days INTEGER,
	data_classification VARCHAR,
	created_at TIMESTAMP WITHOUT TIME ZONE,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.sources (
	id VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	category VARCHAR NOT NULL,
	status VARCHAR,
	last_update VARCHAR,
	reliability_score FLOAT,
	url VARCHAR,
	description TEXT,
	classification VARCHAR,
	retrieved_at TIMESTAMP WITHOUT TIME ZONE,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.suppliers (
	id VARCHAR NOT NULL,
	name VARCHAR NOT NULL,
	country_code VARCHAR NOT NULL,
	market_share_pct FLOAT,
	primary_commodity VARCHAR,
	data_status VARCHAR,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.articles (
	id VARCHAR NOT NULL,
	source_id VARCHAR,
	title VARCHAR NOT NULL,
	source_url VARCHAR,
	published_at TIMESTAMP WITHOUT TIME ZONE,
	retrieved_at TIMESTAMP WITHOUT TIME ZONE,
	raw_content TEXT,
	dataset_version VARCHAR,
	data_status VARCHAR,
	PRIMARY KEY (id),
	FOREIGN KEY(source_id) REFERENCES public.sources (id)
);

CREATE TABLE IF NOT EXISTS public.event_entities (
	id SERIAL NOT NULL,
	event_id VARCHAR NOT NULL,
	entity_name VARCHAR NOT NULL,
	entity_type VARCHAR NOT NULL,
	canonical_id VARCHAR,
	PRIMARY KEY (id),
	FOREIGN KEY(event_id) REFERENCES public.events (id)
);

CREATE TABLE IF NOT EXISTS public.impact_assessments (
	id VARCHAR NOT NULL,
	event_id VARCHAR NOT NULL,
	target_country VARCHAR NOT NULL,
	commodity VARCHAR NOT NULL,
	import_exposure_pct FLOAT NOT NULL,
	supplier_concentration_hhi FLOAT NOT NULL,
	route_exposure_pct FLOAT NOT NULL,
	potential_disruption_bpd FLOAT NOT NULL,
	projected_delay_days FLOAT NOT NULL,
	reserve_runway_days INTEGER NOT NULL,
	price_pressure_proxy VARCHAR NOT NULL,
	data_classification VARCHAR,
	timestamp TIMESTAMP WITHOUT TIME ZONE,
	PRIMARY KEY (id),
	FOREIGN KEY(event_id) REFERENCES public.events (id)
);

CREATE TABLE IF NOT EXISTS public.recommendations (
	id VARCHAR NOT NULL,
	event_id VARCHAR,
	action VARCHAR NOT NULL,
	priority VARCHAR NOT NULL,
	reason TEXT NOT NULL,
	trigger VARCHAR NOT NULL,
	evidence JSON,
	expected_effect VARCHAR NOT NULL,
	data_classification VARCHAR,
	created_at TIMESTAMP WITHOUT TIME ZONE,
	PRIMARY KEY (id),
	FOREIGN KEY(event_id) REFERENCES public.events (id)
);

CREATE TABLE IF NOT EXISTS public.risk_assessments (
	id VARCHAR NOT NULL,
	event_id VARCHAR NOT NULL,
	overall_risk_score INTEGER NOT NULL,
	threat_level VARCHAR NOT NULL,
	confidence_score FLOAT NOT NULL,
	threat_severity FLOAT NOT NULL,
	event_probability FLOAT NOT NULL,
	asset_exposure FLOAT NOT NULL,
	chokepoint_criticality FLOAT NOT NULL,
	alternative_route_gap FLOAT NOT NULL,
	formula_version VARCHAR,
	input_parameters JSON,
	weights JSON,
	timestamp TIMESTAMP WITHOUT TIME ZONE,
	data_classification VARCHAR,
	PRIMARY KEY (id),
	FOREIGN KEY(event_id) REFERENCES public.events (id)
);

CREATE TABLE IF NOT EXISTS public.scenario_results (
	id VARCHAR NOT NULL,
	scenario_id VARCHAR NOT NULL,
	baseline_risk INTEGER NOT NULL,
	simulated_risk INTEGER NOT NULL,
	baseline_exposure_pct FLOAT NOT NULL,
	simulated_exposure_pct FLOAT NOT NULL,
	projected_volume_loss_bpd FLOAT NOT NULL,
	simulated_delay_days FLOAT NOT NULL,
	remaining_reserve_days INTEGER NOT NULL,
	mitigation_urgency VARCHAR NOT NULL,
	calculated_at TIMESTAMP WITHOUT TIME ZONE,
	PRIMARY KEY (id),
	FOREIGN KEY(scenario_id) REFERENCES public.scenarios (id)
);

CREATE INDEX IF NOT EXISTS ix_chokepoints_id ON public.chokepoints (id);
CREATE INDEX IF NOT EXISTS ix_countries_id ON public.countries (id);
CREATE INDEX IF NOT EXISTS ix_energy_flows_id ON public.energy_flows (id);
CREATE INDEX IF NOT EXISTS ix_events_id ON public.events (id);
CREATE INDEX IF NOT EXISTS ix_ports_id ON public.ports (id);
CREATE INDEX IF NOT EXISTS ix_routes_id ON public.routes (id);
CREATE INDEX IF NOT EXISTS ix_scenarios_id ON public.scenarios (id);
CREATE INDEX IF NOT EXISTS ix_sources_id ON public.sources (id);
CREATE INDEX IF NOT EXISTS ix_suppliers_id ON public.suppliers (id);
CREATE INDEX IF NOT EXISTS ix_articles_id ON public.articles (id);
CREATE INDEX IF NOT EXISTS ix_impact_assessments_id ON public.impact_assessments (id);
CREATE INDEX IF NOT EXISTS ix_recommendations_id ON public.recommendations (id);
CREATE INDEX IF NOT EXISTS ix_risk_assessments_id ON public.risk_assessments (id);
CREATE INDEX IF NOT EXISTS ix_scenario_results_id ON public.scenario_results (id);

ALTER TABLE public.chokepoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.energy_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenario_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access on chokepoints" ON public.chokepoints;
CREATE POLICY "Allow public read access on chokepoints" ON public.chokepoints FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on countries" ON public.countries;
CREATE POLICY "Allow public read access on countries" ON public.countries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on energy_flows" ON public.energy_flows;
CREATE POLICY "Allow public read access on energy_flows" ON public.energy_flows FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on events" ON public.events;
CREATE POLICY "Allow public read access on events" ON public.events FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on ports" ON public.ports;
CREATE POLICY "Allow public read access on ports" ON public.ports FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on routes" ON public.routes;
CREATE POLICY "Allow public read access on routes" ON public.routes FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on scenarios" ON public.scenarios;
CREATE POLICY "Allow public read access on scenarios" ON public.scenarios FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on sources" ON public.sources;
CREATE POLICY "Allow public read access on sources" ON public.sources FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on suppliers" ON public.suppliers;
CREATE POLICY "Allow public read access on suppliers" ON public.suppliers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on articles" ON public.articles;
CREATE POLICY "Allow public read access on articles" ON public.articles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on event_entities" ON public.event_entities;
CREATE POLICY "Allow public read access on event_entities" ON public.event_entities FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on impact_assessments" ON public.impact_assessments;
CREATE POLICY "Allow public read access on impact_assessments" ON public.impact_assessments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on recommendations" ON public.recommendations;
CREATE POLICY "Allow public read access on recommendations" ON public.recommendations FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on risk_assessments" ON public.risk_assessments;
CREATE POLICY "Allow public read access on risk_assessments" ON public.risk_assessments FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public read access on scenario_results" ON public.scenario_results;
CREATE POLICY "Allow public read access on scenario_results" ON public.scenario_results FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow service role insert on chokepoints" ON public.chokepoints;
CREATE POLICY "Allow service role insert on chokepoints" ON public.chokepoints FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on chokepoints" ON public.chokepoints;
CREATE POLICY "Allow service role update on chokepoints" ON public.chokepoints FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on countries" ON public.countries;
CREATE POLICY "Allow service role insert on countries" ON public.countries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on countries" ON public.countries;
CREATE POLICY "Allow service role update on countries" ON public.countries FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on energy_flows" ON public.energy_flows;
CREATE POLICY "Allow service role insert on energy_flows" ON public.energy_flows FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on energy_flows" ON public.energy_flows;
CREATE POLICY "Allow service role update on energy_flows" ON public.energy_flows FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on events" ON public.events;
CREATE POLICY "Allow service role insert on events" ON public.events FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on events" ON public.events;
CREATE POLICY "Allow service role update on events" ON public.events FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on ports" ON public.ports;
CREATE POLICY "Allow service role insert on ports" ON public.ports FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on ports" ON public.ports;
CREATE POLICY "Allow service role update on ports" ON public.ports FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on routes" ON public.routes;
CREATE POLICY "Allow service role insert on routes" ON public.routes FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on routes" ON public.routes;
CREATE POLICY "Allow service role update on routes" ON public.routes FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on scenarios" ON public.scenarios;
CREATE POLICY "Allow service role insert on scenarios" ON public.scenarios FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on scenarios" ON public.scenarios;
CREATE POLICY "Allow service role update on scenarios" ON public.scenarios FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on sources" ON public.sources;
CREATE POLICY "Allow service role insert on sources" ON public.sources FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on sources" ON public.sources;
CREATE POLICY "Allow service role update on sources" ON public.sources FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on suppliers" ON public.suppliers;
CREATE POLICY "Allow service role insert on suppliers" ON public.suppliers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on suppliers" ON public.suppliers;
CREATE POLICY "Allow service role update on suppliers" ON public.suppliers FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on articles" ON public.articles;
CREATE POLICY "Allow service role insert on articles" ON public.articles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on articles" ON public.articles;
CREATE POLICY "Allow service role update on articles" ON public.articles FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on event_entities" ON public.event_entities;
CREATE POLICY "Allow service role insert on event_entities" ON public.event_entities FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on event_entities" ON public.event_entities;
CREATE POLICY "Allow service role update on event_entities" ON public.event_entities FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on impact_assessments" ON public.impact_assessments;
CREATE POLICY "Allow service role insert on impact_assessments" ON public.impact_assessments FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on impact_assessments" ON public.impact_assessments;
CREATE POLICY "Allow service role update on impact_assessments" ON public.impact_assessments FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on recommendations" ON public.recommendations;
CREATE POLICY "Allow service role insert on recommendations" ON public.recommendations FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on recommendations" ON public.recommendations;
CREATE POLICY "Allow service role update on recommendations" ON public.recommendations FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on risk_assessments" ON public.risk_assessments;
CREATE POLICY "Allow service role insert on risk_assessments" ON public.risk_assessments FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on risk_assessments" ON public.risk_assessments;
CREATE POLICY "Allow service role update on risk_assessments" ON public.risk_assessments FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow service role insert on scenario_results" ON public.scenario_results;
CREATE POLICY "Allow service role insert on scenario_results" ON public.scenario_results FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow service role update on scenario_results" ON public.scenario_results;
CREATE POLICY "Allow service role update on scenario_results" ON public.scenario_results FOR UPDATE USING (true);
