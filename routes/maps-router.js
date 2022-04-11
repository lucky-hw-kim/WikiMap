const express = require('express');
const router = express.Router();
const mapsQueries = require('../lib/maps-queries');

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
    const userId = 2;
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
    const userId = 2;
    if (!userId) {
      //Need to login message
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


  // GET /maps/:id -- Get specific map used cliked
  router.get('/:id', (req, res) => {
    const mapId = req.params.id;
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

  // POST /maps/edit -- Edit a map (we can always edit saying last modified by user_id)
  router.post('/:id/edit', (req, res) => {
    // const userId = req.session.userId;
    const userId = 2;
    const map_id = req.params;
    const mapDetails = {
      ...req.body,
      
    }
    if (!userId) {
      //Need to login message
      res.error("💩");
      return;
    }
    mapsQueries.editMap(userId)
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
    const userId = 2;
    if (!userId) {
      //Need to login message
      res.error("💩");
      return;
    }

    mapsQueries.addMap(userId)
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

/*
********* Pins router
*/

// GET /maps/pins:id -- Get specific pin clicked




  module.exports = router;




