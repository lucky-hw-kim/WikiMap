-- Drop and recreate Users table (Example)

/*     X         Y
POINT(-0.138702 51.501220)
https://blog.crunchydata.com/blog/postgis-and-the-geography-type#:~:text=The%20PostGIS%20%22geography%22%20type%20is,loaded%20into%20a%20geography%20column.

*/
DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INT REFERENCES maps(id) ON DELETE CASCADE,
  pin_icon_id INT DEFAULT 1 REFERENCES pin_icons(id) ON DELETE CASCADE,
  name VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  locked BOOLEAN DEFAULT FALSE,
  image_url VARCHAR(255) NOT NULL
);