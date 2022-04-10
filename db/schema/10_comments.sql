-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS comments CASCADE;
CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  map_id INT REFERENCES maps(id) ON DELETE CASCADE,
  comment TEXT NOT NULL
);