-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS images CASCADE;
CREATE TABLE images (
  id SERIAL PRIMARY KEY NOT NULL,
  pin_id INT REFERENCES pins(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);