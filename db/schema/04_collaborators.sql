-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS collaborators CASCADE;
CREATE TABLE collaborators (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  map_id INT REFERENCES maps(id) ON DELETE CASCADE
);