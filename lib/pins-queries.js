const db = require('../server');

// Get all the pins from all the map (home page) >> Browse
const getAllPinsFromAllMaps = () => {
  return db.query(`SELECT * FROM pins`)
  .then((result)=>{
    return result.rows;

  })
  .catch(err => console.log(err.message));
}

// Get all the pins from a map (non-user can access too) >> Browse
const getAllPins = (map_id) => {
  return db.query(`SELECT * FROM pins WHERE map_id = $1`, [map_id])
  .then(result => result.rows)
  .catch(err => console.log(err.message));
};

// Get a selected pin >> Read
const getSelectedPin = (map_id, pin_id) => {
  const queryString = `
  SELECT * FROM pins
  WHERE map_id = $1
  AND pins.id = $2
  `
  console.log(pin_id);
  return db.query(queryString, [map_id, pin_id])
  .then(result => result.rows)
  .catch(err => console.log(err.message));
}

// Edit a pin >> Edit
const editPin = (pinDetails) => {
  const queryParams = [];
  const setClause = [];
  const {map_id, pin_id, pin_icon_id, name, description, location, locked} = pinDetails;
  const queryString = `UPDATE pins `;
  
  if (pin_icon_id) {
    queryParams.push(`${pin_icon_id}`)
    setClause.push(`pin_icon_id = $${queryParams.length}`)
  }
  if (name) {
    queryParams.push(`${name}`)
    setClause.push(`name = $${queryParams.length}`)
  }
  if (description) {
    queryParams.push(`${description}`)
    setClause.push(`description = $${queryParams.length}`)
  }
  if (location) {
    queryParams.push(`${location}`)
    setClause.push(`location = $${queryParams.length}`)
  }
  if (locked) {
    queryParams.push(`${locked}`)
    setClause.push(`locked = $${queryParams.length}`)
  }

  if(queryParams.length > 0) {
  queryString += `SET ` + setClause.join(`, `);
  };

  queryString += ` WHERE map_id = ${map_id}  
                   AND pins.id = ${pin_id}
                   RETURNING *;`;
                   
  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));
  
}

// Creat a new pin >> Add
const addPin = (pinDetails) => {
  const { map_id, pin_icon_id, name, description, location, locked, image_url } = pinDetails;
  const queryString = `
  INSERT INTO pins (map_id, pin_icon_id, name, description, location, locked, image_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `
  const queryParams = [map_id, pin_icon_id, name, description, location, locked, image_url];

  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));

}

// const addImage = (imageDetails) =>{
//   const { pin_id, name, image_url } = imageDetails;
//   const queryString = `
//   INSERT INTO images ( pin_id, name, image_url )
//   VALUES ($1, $2, $3)
//   RETURNING *;
//   `;

//   const queryParams = [ pin_id, name, image_url ];
//   return db.query(queryString, queryParams)  
//   .then(result => result.rows)
//   .catch(err => console.log(err.message));
// }

// Delete a pin >> Delete
// For our purposes delete should be ok I think (user can only delete their own pins)

const deletePin = (pinDetails) => {
  const {pin_id, user_id, map_id} = pinDetails
  const queryString = `
  DELETE FROM pins
  WHERE pins.id = $1
  AND user_id = $2
  AND map_id = $3
  RETURNING *;
  `
  const queryParams = [pin_id, user_id, map_id];

  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));
}


module.exports = {
  getAllPinsFromAllMaps,
  getAllPins,
  getSelectedPin,
  editPin,
  addPin,
  deletePin
}
