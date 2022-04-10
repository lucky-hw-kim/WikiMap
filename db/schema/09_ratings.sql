-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS ratings CASCADE;
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  map_id INT REFERENCES maps(id) ON DELETE CASCADE,
  rating INT NOT NULL
);