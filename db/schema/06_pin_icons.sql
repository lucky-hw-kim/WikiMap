-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS pin_icons CASCADE;
CREATE TABLE pin_icons (
  id SERIAL PRIMARY KEY NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  icon_url VARCHAR(255) NOT NULL
);