CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE uom (
    uom_id serial PRIMARY KEY,
    abbr character varying(255),
    unit_name character varying(255),
    plural character varying(255),
    modifier character varying(255),
    unit_type character varying(255),
    unit_system character varying(255),
    conversion_factor numeric,
    common boolean DEFAULT false
);

CREATE TABLE location_types (
    loc_type_id serial PRIMARY KEY,
    loc_type character varying(255) NOT NULL UNIQUE,
    description character varying,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE locations (
    loc_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    loc_name character varying(255) NOT NULL UNIQUE,
    address1 character varying(255),
    address2 character varying(255),
    city character varying(255) DEFAULT 'Minneapolis'::character varying,
    state character varying(255) DEFAULT 'MN'::character varying,
    zip character varying(255),
    website character varying(255),
    loc_phone character varying(255),
    map_id character varying(255),
    lat numeric,
    long numeric,
    loc_type_id integer REFERENCES location_types(loc_type_id),
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE users (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    username character varying(255) NOT NULL UNIQUE,
    password character varying(1023) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    user_phone character varying(255),
    contact_notes character varying,
    loc_id uuid REFERENCES locations(loc_id),
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    loc_id uuid REFERENCES locations(loc_id),
    status character varying(255),
    food_name character varying(255),
    food_description character varying,
    exp_date timestamp with time zone,
    qty numeric,
    qty_unit integer REFERENCES uom(uom_id),
    number_pkgs integer,
    pkg_desc character varying(255),
    storage_instructions character varying,
    prep_instructions character varying,
    notes character varying,
    contact_name character varying(255),
    contact_phone character varying(255),
    contact_email character varying(255),
    contact_notes character varying,
    pickup_org_id uuid REFERENCES locations(loc_id),
    pickup_start timestamp with time zone,
    pickup_end timestamp with time zone,
    pickup_notes character varying,
    pickup_status character varying(255),
    pickup_created_at timestamp with time zone,
    pickup_created_by uuid REFERENCES users(id),
    pickup_closed_at timestamp with time zone,
    pickup_closed_by uuid REFERENCES users(id),
    created_at timestamp with time zone DEFAULT now(),
    created_by uuid REFERENCES users(id)
);

CREATE OR REPLACE VIEW user_info AS
  SELECT
	a.id,
	a.id as user_id,
    a.username,
    a.password,
    a.first_name,
    a.last_name,
    a.email,
    a.user_phone,
    a.contact_notes,
    concat(a.first_name, ' ', a.last_name) AS full_name,    b.loc_id,
    b.loc_name,
    b.address1,
    b.address2,
    b.city,
    b.state,
    b.zip,
    b.website,
    b.loc_phone,
    b.map_id,
    b.lat,
    b.long,
    b.loc_type_id,
    c.loc_type
   FROM users a
     JOIN locations b USING (loc_id)
     JOIN location_types c USING (loc_type_id);
     
CREATE OR REPLACE VIEW item_info AS
  SELECT
	a.item_id,
    a.loc_id,
    a.status,
    a.food_name,
    a.food_description,
    a.exp_date,
    a.qty,
    a.uom_id,
    d.abbr,
    a.number_pkgs,
    a.pkg_desc,
    a.storage_instructions,
    a.prep_instructions,
    a.notes,
    a.contact_name,
    a.contact_phone,
    a.contact_email,
    a.contact_notes,
    a.pickup_start,
    a.pickup_end,
    a.pickup_notes,
    a.created_at,
    a.created_by,
    a.pickup_org_id,
    c.loc_name as pickup_org_name,
    a.pickup_created_by,
    a.pickup_created_at,
    a.pickup_status,
    b.loc_name,
    b.address1,
    b.address2,
    b.city,
    b.state,
    b.zip,
    b.website,
    b.loc_phone,
    b.map_id,
    b.lat,
    b.long
   FROM items a
     JOIN locations b USING (loc_id)
     LEFT JOIN locations c ON a.pickup_org_id=c.loc_id     
     JOIN uom d USING (uom_id);
     
INSERT INTO location_types ("loc_type_id","loc_type")
VALUES
(1,'donor'),
(2,'rescuer');

INSERT INTO "public"."uom"("uom_id","abbr","unit_name","plural","modifier","unit_type","unit_system","conversion_factor","common")
VALUES
(2,E'oz',E'ounce',E'ounces',NULL,E'mass (weight)',E'US',0.0283495,FALSE),
(3,E'lb',E'pound',E'pounds',NULL,E'mass (weight)',E'US',0.453592,TRUE),
(4,E'fl oz',E'fluid ounce',E'fluid ounces',NULL,E'volume',E'US',0.0295735,FALSE),
(5,E'c',E'cup',E'cups',NULL,E'volume',E'US',0.24,FALSE),
(6,E'pt',E'pint',E'pints',NULL,E'volume',E'US',0.473176,FALSE),
(7,E'qt',E'quart',E'quarts',NULL,E'volume',E'US',0.946353,FALSE),
(8,E'gal',E'gallon',E'gallons',NULL,E'volume',E'US',3.78541,FALSE),
(9,E'g',E'gram',E'grams',NULL,E'mass (weight)',E'metric',1000,TRUE),
(10,E'Kg',E'kilogram',E'kilograms',NULL,E'mass (weight)',E'metric',1,TRUE),
(11,E'mL',E'milliliter',E'milliliters',NULL,E'volume',E'metric',0.001,FALSE),
(12,E'L',E'liter',E'liters',NULL,E'volume',E'metric',1,FALSE);

INSERT INTO "locations"("loc_name","address1","address2","city","state","zip","website","loc_phone","map_id","lat","long","loc_type_id")
VALUES
(E'fig + farro',E'3001 Hennepin Ave S',NULL,E'Minneapolis',E'MN',E'55408',E'www.figandfarro.com',E'(612) 208-0609',NULL,44.948168,-93.297981,1),
(E'Open Arms of Minnesota',E'2500 Bloomington Ave',NULL,E'Minneapolis',E'MN',E'55404',E'www.openarmsmn.org',E'(612) 872-1152',NULL,44.9346481,93.3085437,2),
(E'Gandhi Mahal',E'3009 27th Ave S',NULL,E'Minneapolis',E'MN',E'55406',E'www.gandhimahal.com',E'(612) 729-5222',NULL,44.9479224,-93.2329495,1),
(E'Tiny Diner',E'1024 E 38th St',NULL,E'Minneapolis',E'MN',E'55407',E'www.tinydiner.com',E' (612) 767-3322',NULL,44.9344457,-93.2590032,1),
(E'Simpson Housing Services',E'2740 1st Ave S',NULL,E'Minneapolis',E'MN',E'55408',E'www.simpsonhousing.org',E'(612) 874-0306',NULL,44.9570056,-93.2836962,2);