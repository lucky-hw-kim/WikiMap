-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INT REFERENCES maps(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);