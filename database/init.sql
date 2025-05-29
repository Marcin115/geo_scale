CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    lat  DOUBLE PRECISION NOT NULL,
    lon  DOUBLE PRECISION NOT NULL
);

INSERT INTO places (name, lat, lon) VALUES
('Warszawa', 52.2297, 21.0122),
('Kraków',    50.0647, 19.9450);