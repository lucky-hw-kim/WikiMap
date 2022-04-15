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
  let queryParams = [];
  let setClause = [];
  console.log(pinDetails);
  let {map_id, pinId, pinName, pinDesc, pinGeo, pinImage} = pinDetails;
  let queryString = `UPDATE pins `;

  if (pinName) {
    queryParams.push(`${pinName}`)
    setClause.push(`name = $${queryParams.length}`)
  }
  if (pinDesc) {
    queryParams.push(`${pinDesc}`)
    setClause.push(`description = $${queryParams.length}`)
  }
  if (pinGeo) {
    queryParams.push(`${pinGeo}`)
    setClause.push(`location = $${queryParams.length}`)
  }
  if (pinImage) {
    queryParams.push(`${pinImage}`)
    setClause.push(`image_url = $${queryParams.length}`)
  }


  if(queryParams.length > 0) {
  queryString += `SET ` + setClause.join(`, `);
  };

  queryString += ` WHERE pins.map_id = ${map_id}
                   AND pins.id = ${pinId}
                   RETURNING *;`;


                  console.log(queryString);
                  console.log(queryParams);
  return db.query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));

}

// Creat a new pin >> Add
const addPin = (pinDetails) => {
  const { map_id, name, description, location, image_url } = pinDetails;
  const queryString = `
  INSERT INTO pins (map_id, name, description, location, image_url)
  VALUES ($1, $2, $3, $4, $5 )
  RETURNING *;
  `
  const queryParams = [map_id, name, description, location, image_url];
  console.log(queryString);
  console.log(queryParams);
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
  const {pin_id} = pinDetails
  const queryString = `
  DELETE FROM pins
  WHERE pins.id = $1
  RETURNING *;
  `
  const queryParams = [pin_id];

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
