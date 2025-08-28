
CREATE TABLE ships (
  id TEXT PRIMARY KEY,
  name TEXT,
  imo TEXT,
  product TEXT,
  tonnage TEXT,
  arrival TEXT,
  docking TEXT,
  window TEXT,
  port TEXT,
  status TEXT,
  operator TEXT,
  agency TEXT,
  dwt TEXT,
  loa TEXT
);

CREATE TABLE ports (
  id TEXT PRIMARY KEY,
  name TEXT,
  code TEXT,
  state TEXT,
  docked INTEGER,
  scheduled INTEGER,
  status TEXT,
  efficiency INTEGER
);

CREATE TABLE products (
  product TEXT PRIMARY KEY,
  percentage INTEGER,
  tonnage TEXT,
  color TEXT
);


