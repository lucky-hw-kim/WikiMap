-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  header_image VARCHAR(255) NOT NULL,
  date_created DATE NOT NULL,
  date_modified DATE NOT NULL,
  public BOOLEAN NOT NULL DEFAULT TRUE
);