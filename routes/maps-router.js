const express = require('express');
const router = express.Router();
const mapsQueries = require('../lib/maps-queries');

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
    const userId = req.session.userId;
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
    const userId = req.session.userId;
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


  // POST /maps/ -- Create a map
  router.get('/', (req, res) => {
    const userId = req.session.userId;
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

  module.exports = router;




