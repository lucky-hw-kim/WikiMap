const express = require('express');
const { defaults } = require('pg');
const router = express.Router();
const mapsQueries = require('../lib/maps-queries');
const pinsQueries = require('../lib/pins-queries');
const user_id = 2;
// const user_id = req.session.user_id;
/*
********* Maps router
*/
// GET /maps/ -- Get all the maps 
router.get('/', (req, res) => {
  mapsQueries.getAllMaps()
    .then( maps => {
      res.json({maps});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
    res.render("maps");
})

// problem with looping and rendering both data to save page is giving me trouble

// GET /maps/saved -- Get maps that the user created
router.get('/:userId/saved', (req, res) => {
    const user_id = req.params.userId;
    mapsQueries.getFavoriteMaps(user_id)
    .then((favdb) => {
      mapsQueries.getSavedMaps(user_id)
      .then( (maps) => {
        const temp = {
          saved: maps,
          favs: favdb,
        }
        res.render("saved", temp);
      })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
})

// GET /maps/:id -- Get specific map user cliked
router.get('/:mapId', (req, res) => {
  const mapId = req.params.mapId;
  mapsQueries.getSelectedMap(mapId)
    .then( map => {
      res.json({map});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:id/edit -- Edit a map
router.post('/:mapId/edit', (req, res) => {
  const map_id = req.params.mapId;
  const mapDetails = { map_id, ...req.body };
  mapsQueries.editMap(mapDetails)
    .then( maps => {
      res.send({maps});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// POST /maps/ -- Create a map
router.post('/', (req, res) => {
    // 2 is user id
  const mapDetails = { user_id, ...req.body };
  mapsQueries.addMap(mapDetails)
    .then( maps => {
      // res.json(maps);
      res.render("view-map", maps[0])
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// Render create map page
router.get('/:userId/create', (req, res) => {
  const user_id = req.params.userId;
  mapsQueries.getAllMaps()
    .then( maps => {
      res.render('create-map');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})


// POST /maps/:id/delete -- Delete a map
router.post('/:userId/:mapId/delete', (req, res) => {
  const user_id = req.params.userId;
  const map_id = req.params.mapId;
  mapsQueries.deleteMap(map_id, user_id)
    .then( maps => {
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST /maps/favorite -- Add favorite map
router.post('/:userId/', (req, res) => {
  const map_id = req.params.mapId;
  const user_id = req.params.userId;
  mapsQueries.addFavorite(map_id, user_id)
    .then( fav => {
      res.json(fav);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// GET /maps -- Search maps
router.get('/', (req, res) => {
  const title = req.body;
  mapsQueries.searchMaps(title)
    .then( maps => {
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})


/*
********* Pins router
*/

// GET /maps/:mapId/pins -- Get all the pins from a map or maps
router.get('/:userId/:mapId/pins', (req, res) => {
  const map_id = req.params.mapId;
  if(!map_id) {
    pinsQueries.getAllPinsFromAllMaps()
    .then( pins => {
      res.json(pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  return
  }
  pinsQueries.getAllPins(map_id)
    .then( pins => {
      res.json(pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// GET /maps/:mapId/pins/:pinId -- Get specific pin user cliked
router.get('/:userId/:mapId/pins/:pinId', (req, res) => {
  const user_id = req.params.userId;
  const map_id = req.params.mapId;
  const pinId = req.params.pinId;
  pinsQueries.getSelectedPin(map_id, pinId)
    .then( pin => {
      res.json(pin);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:mapId/pins/:pidId/edit -- Edit a pin
router.post('/:userId/:mapId/pins/:pinId/edit', (req, res) => {
  const user_id = req.params.userId;
  const map_id = req.params.mapId;
  const pinId = req.params.pinId;
  const pinDetails = { ...req, pinId, map_id}
  pinsQueries.editPin(pinDetails)
    .then( maps => {
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:mapId/pins -- Add a pin
router.post('/:userId/:mapId/pins', (req, res) => {
  const user_id = req.params.userId;
  const map_id = req.params.mapId;
  const pinDetails = { map_id, user_id, ...req.body }

  pinsQueries.addPin(pinDetails)
    .then( pins => {
      res.json(pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:mapId/pins/:pinId/delete -- Delete a pin
router.post('/:userId/:mapId/pins/:pinId/delete', (req, res) => {
  const user_id = req.params.userId;
  const pin_id = req.params.pinId;
  const map_id = req.params.mapId;
  const pinDetails = {pin_id, user_id, map_id}

  pinsQueries.deletePin(pinDetails)
    .then( pins => {
      res.json(pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;






// <% for (let fav in favs) { %>
//   <!-- <% for (let fa of fav) { %> -->
// <div class="mini-map-container">
//     <section class="mini-map">
//       <div class="maps">
//         <p><%= fav[0].name %></p>
//         <p><%= fav[0].header_image %></p>  
//         <p>Title: <%= fav[0].name %></p>
//         <p>Description: <%= fav[0].description %></p>
//       </div>
//       <author>@<%= fav[0].user_id %></author> 
//     </section>
// </div>
//   <!-- <% } %> -->
// <% } %>