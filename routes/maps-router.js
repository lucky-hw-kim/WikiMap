const express = require('express');
const router = express.Router();
const mapsQueries = require('../lib/maps-queries');
const pinsQueries = require('../lib/pins-queries');
const userId = 2;
/*
********* Maps router
*/
//**** To Test each router fiexd userId = 2;

// GET /maps/ -- Get all the maps 
router.get('/', (req, res) => {
  mapsQueries.getAllMaps()
    .then( maps => {
      // Change to render page with data
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// GET /maps/ -- Get maps that the user created
router.get('/saved', (req, res) => {
  // const userId = req.session.userId;
  if (!userId) {
    //Need to login message
    res.error("💩");
    return;
  }
  mapsQueries.getSavedMaps(userId)
    .then( maps => {
      // Change to render page with data
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// GET /maps/ -- Get maps that the user liked (favorite) 
router.get('/favorite', (req, res) => {
  // const userId = req.session.userId;
  if (!userId) {
    res.error("💩");
    return;
  }
  mapsQueries.getFavoriteMaps(userId)
    .then( maps => {
      // Change to render page with data
      res.json(maps);
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
      // Change to render page with data
      res.json(map);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:id/edit -- Edit a map
router.post('/:mapId/edit', (req, res) => {
  // const userId = req.session.userId;
  const map_id = req.params.mapId;
  const mapDetails = { map_id, ...req.body };

  if (!userId) {
    //Need to login message
    res.error("💩");
    return;
  }
  mapsQueries.editMap(mapDetails)
    .then( maps => {
      // Change to render page with data
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

});

// POST /maps/ -- Create a map
router.post('/', (req, res) => {
  // const userId = req.session.userId;
  const mapDetails = { userId, ...req.body };
  if (!userId) {
    //Need to login message
    res.error("💩");
    return;
  }

  mapsQueries.addMap(mapDetails)
    .then( maps => {
      // Change to render page with data
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:id/delete -- Delete a map
router.post('/:mapId/delete', (req, res) => {
  // const userId = req.session.userId;
  const map_id = req.params.mapId;
  if (!userId) {
    //Need to login message
    res.error("💩");
    return;
  }
  mapsQueries.deleteMap(map_id, userId)
    .then( maps => {
      // Change to render page with data
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


/*
********* Pins router
*/


// GET /maps/:mapId/pins -- Get all the pins from a map or maps
router.get('/:mapId/pins', (req, res) => {
  const map_id = req.params.mapId;
  if(!map_id) {
    pinsQueries.getAllPinsFromAllMaps()
    .then( pins => {
      // Change to render page with data
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
      // Change to render page with data
      res.json(pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// GET /maps/:mapId/pins/:pinId -- Get specific pin user cliked
router.get('/:mapId/pins/:pinId', (req, res) => {
  const map_id = req.params.mapId;
  const pinId = req.params.pinId;
  pinsQueries.getSelectedPin(map_id, pinId)
    .then( pin => {
      // Change to render page with data
      res.json(pin);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:mapId/pins/:pidId/edit -- Edit a pin
router.post('/:mapId/pins/:pinId/edit', (req, res) => {
  const map_id = req.params.mapId;
// const userId = req.session.userId;
  const pinId = req.params.pinId;
  const pinDetails = {
    ...req,
    pinId,
    map_id
  }

  if (!userId) {
    //Need to login message
    res.error("💩");
    return;
  }
  pinsQueries.editPin(pinDetails)
    .then( maps => {
      // Change to render page with data
      res.json(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:mapId/pins -- Add a pin
router.post('/:mapId/pins', (req, res) => {
  const map_id = req.params.mapId;
  // const userId = req.session.userId;
  const pinDetails = { map_id, userId, ...req.body };
  if (!userId) {
    //Need to login message
    res.error("💩");
    return;
  }

  pinsQueries.addPin(pinDetails)
    .then( pins => {
      // Change to render page with data
      res.json(pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// POST /maps/:mapId/pins/:pinId/delete -- Delete a pin
router.post('/:mapId/pins/:pinId/delete', (req, res) => {
  const pin_id = req.params.pinId;
  const map_id = req.params.mapId;
  // const userId = req.session.userId;
  const pinDetails = {pin_id, userId, map_id}

  if (!userId) {
    //Need to login message
    res.error("💩");
    return;
  }
  pinsQueries.deletePin(pin_id, userId, map_id)
    .then( pins => {
      // Change to render page with data
      res.json(pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;




