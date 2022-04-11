
const db = require('../server');

// Get all the maps (non-user can access too)
const getAllMaps = () => {
  return db.query(`SELECT * FROM maps;`)
  .then( res => {
    return res.rows;
  });
};


// Get list of maps that are created by the users
// Q: seperation between collaborated maps & created maps?
const getSavedMaps = (user_id) => {
  return db.query(`SELECT * FROM maps WHERE user_id = $1;`, [user_id])
  .then( res => {
    return res.rows;
  });
}


// Get list of favorite maps (user_id is kinda vague)
const getFavoriteMaps = (user_id) => {
  const queryString = `
  SELECT maps.id FROM maps.* JOIN favorites ON maps.id = favorites.map_id JOIN users ON user.id = favorites.user_id WHERE user.id = favorites.user_id;`;

  return db.query(queryString, [user_id])
  .then( res => {
    return res.rows;
  });
}

// Get a selected map
const getSelectedMap = (map_id) => {
  const queryString = `
  SELECT * FROM maps
  WHERE maps.id = $1
  `
  console.log(map_id);
  return db.query(queryString, [map_id])
  .then( res => {
    return res.rows[0];
  });
}

// Creat a new map
const addMap = (user_id, name, description, header_image, date_created, date_modified, public) => {
  const queryString = `
  INSERT INTO maps (user_id, name, description, header_image, date_created, date_modified, public)
  VALUE ($1, $2, $3, $4, $5, $6, $7)
  `
  queryParams = [maps.user_id, maps.name, maps.description, maps.header_image, maps.date_created, maps.date_modified, maps.public]
}


module.exports = {
  getAllMaps,
  getSavedMaps,
  getFavoriteMaps,
  getSelectedMap,
  addMap
}
