const db = require('../server');

// Get all the maps (non-user can access too) >> Browse
const getAllMaps = () => {
  return db.query(`SELECT * FROM maps;`)
  .then(result => result.rows)
  .catch(err => console.log(err.message));
};


// Get list of maps that are created by the users >> Read
// Q: seperation between collaborated maps & created maps?
const getSavedMaps = (user_id) => {
  const queryString = `
  SELECT * FROM maps
  WHERE user_id = $1
  `
  return db.query(queryString, [user_id])
  .then(result => result.rows)
  .catch(err => console.log(err.message));
}


// Get list of favorite maps (user_id is kinda vague) >> Read
const getFavoriteMaps = (user_id) => {
  const queryString = `
  SELECT maps.* FROM maps 
  JOIN favorites ON maps.id = favorites.map_id 
  JOIN users ON users.id = favorites.user_id 
  WHERE users.id = $1 AND
  maps.id = favorites.map_id;`;

  return db.query(queryString, [user_id])
  .then(result => result.rows)
  .catch(err => console.log(err.message));
}

// Get a selected map >> Read
const getSelectedMap = (map_id) => {
  const queryString = `
  SELECT * FROM maps
  WHERE maps.id = $1
  `
  console.log(map_id);
  return db.query(queryString, [map_id])
  .then(result => result.rows)
  .catch(err => console.log(err.message));
}

// Edit a map >> Edit
const editMap = (mapDetails) => {
  const queryParams = [];
  const setClause = [];
  const {map_id, name, description, header_image, public} = mapDetails;
  const queryString = `UPDATE maps `;

  if (name) {
    queryParams.push(`${name}`)
    setClause.push(`name = $${queryParams.length}`)
  }
  if (description) {
    queryParams.push(`${description}`)
    setClause.push(`description = $${queryParams.length}`)
  }
  if (header_image) {
    queryParams.push(`${header_image}`)
    setClause.push(`header_image = $${queryParams.length}`)
  }
  if (public) {
    queryParams.push(`${public}`)
    setClause.push(`public = $${queryParams.length}`)
  }
  if (queryParams.length > 0) {
    setClause.push(`date_modified = CURRENT_DATE`)
  }

  if(queryParams.length > 0) {
  queryString += `SET ` + setClause.join(`, `);
  };

  queryString += ` WHERE maps.id = ${map_id}
                   RETURNING *;`;
                   
  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));
  
}

// Creat a new map >> Add
const addMap = (mapDetails) => {
  const {user_id, name, description, header_image, public} = mapDetails;
  const queryString = `
  INSERT INTO maps (user_id, name, description, header_image, date_created, date_modified, public)
  VALUES ($1, $2, $3, $4, NOW(), NOW(), $5)
  RETURNING *;
  `
  const queryParams = [user_id, name, description, header_image, public];

  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));

}

// Delete a map >> Delete
// For our purposes delete should be ok I think (user can only delete their own maps)
const deleteMap = (map_id, user_id) => {
  const queryString = `
  DELETE FROM maps
  WHERE maps.id = $1
  AND user_id = $2
  RETURNING *;
  `
  const queryParams = [map_id, user_id];

  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));
}


module.exports = {
  getAllMaps,
  getSavedMaps,
  getFavoriteMaps,
  getSelectedMap,
  editMap,
  addMap,
  deleteMap
}
