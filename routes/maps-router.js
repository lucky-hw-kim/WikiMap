const express = require('express');
const { defaults } = require('pg');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');
const mapsQueries = require('../lib/maps-queries');
const pinsQueries = require('../lib/pins-queries');
const { render } = require('sass');
// Hard coded user Id
const user_id = 3;

/*
* Path to user or user login require: maps/:userId
* Path map accessing: maps/:mapId
* Path to Pins : maps/list/:mapId/pins/:pinId
* Modifying or Creating Pins : /maps/:mapId/pins/:pinId
*/

//Assigns location for image storage
const storage1 = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/styles/condensed_image/uploads');
      // public/condensed_image/uploads/
  },
//Creates new filename for reformatted image!
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.webp');
  }
});
let upload1 = multer({ storage: storage1 })

//Assigns location for image storage
const storage2 = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/styles/condensed_image/uploads');
      // public/condensed_image/uploads/
  },
//Creates new filename for reformatted image!
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.webp');
  }
});
let upload2 = multer({ storage: storage2 })


/*
********* Maps router
*/
// GET /maps/ -- Get all the pins to one map
router.get('/', (req, res) => {
  pinsQueries.getAllPinsFromAllMaps()
    .then( maps => {
      res.render("maps",{maps});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// GET /maps/ -- Get all the maps
router.get('/list', (req, res) => {
  mapsQueries.getAllMaps()
    .then( maps => {
      res.render("map-list", {maps, user_id});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

// GET /maps//:userId/profile
// GET /maps/:userId/profile
//-- Profile Page (fav & saved)
router.get('/:userId/profile', (req, res) => {
    const user_id = req.params.userId;
    mapsQueries.getFavoriteMaps(user_id)
    .then((favdb) => {
      mapsQueries.getSavedMaps(user_id)
      .then( (maps) => {
        const temp = {
          saved: maps,
          favs: favdb,
          user_id
        }
        console.log(temp.favs);
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
router.get('/list/:mapId', (req, res) => {
  const map_Id = req.params.mapId;
  mapsQueries.getSelectedMap(map_Id)
    .then( maps => {
      res.render("view-map", {maps});
    })
    .catch(err => {
      // res.render("errorPage404");
      res
        .status(500)
        .json({ error: err.message });
    });
})

// GET /maps/:userId/:id/edit -- Open Edit Map Page
router.get('/:userId/:mapId/edit', (req, res) => {
  const user_id = req.params.userId;
  const map_id = req.params.mapId;
  mapsQueries.getSelectedMap(map_id)
  .then( maps => {
    res.render("edit-map", {maps});
  })
  .catch(err => {
    // res.render("errorPage404");
    res
      .status(500)
      .json({ error: err.message });
  });
});

// POST /maps/:userId/:id/edit -- Edit a map (submission)
router.post('/:userId/:mapId/edit', upload2.single('header_image'), (req, res, next) => {
  let header_image = '/styles/condensed_image/uploads/resized/' + req.file.filename
  const map_id = req.params.mapId;
  const mapDetails = {map_id, ...req.body, header_image};

  mapsQueries.editMap(mapDetails)
    .then( maps => {
      // res.render("view-map",{maps});
      next()
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//Reformats image to given criteria
router.post('/:userId/:mapId/edit', upload2.single('header_image'),async (req, res, next) => {
  const { filename: image } = req.file;
  console.log(req.file);
   await sharp(req.file.path)
    .resize(375, 245)
    .webp({ quality: 90 })
    .toFile(
        path.resolve(req.file.destination,'resized',image)
    )
    fs.unlinkSync(req.file.path)
    res.redirect('/maps/list');
});




// POST /maps/ -- Create a map
router.post('/',upload1.single('header_image') ,(req, res, next) => {
  let header_image =
  '/styles/condensed_image/uploads/resized/' + req.file.filename
  console.log("Req.File:", header_image);
  let mapDetails = { user_id, ...req.body, header_image};
  mapsQueries.addMap(mapDetails)
    .then( maps => {
      next()
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

/*
 * Image compression and save
 */

//Takes any image given
// router.get('/9/create', (req, res) => {
//   res.sendFile("./views/create-map.ejs");
// });

//Reformats image to given criteria
router.post('/', upload1.single('header_image'),async (req, res, next) => {
  const { filename: image } = req.file;
   await sharp(req.file.path)
    .resize(375, 245)
    .webp({ quality: 90 })
    .toFile(
        path.resolve(req.file.destination,'resized',image)
    )
    fs.unlinkSync(req.file.path)
    res.redirect('maps/list');
});


/*
 * Redirect back to list page
 */
// POST /maps/favorite -- Add favorite map or Delete
router.post('/list/:userId/:mapId/favorite', (req, res) => {
  // check if there is already a same map id with same user id
  const map_id = req.params.mapId;
  const user_id = req.params.userId;
  mapsQueries.checkIfFavoriteExist(map_id, user_id)
    .then (check => {
      let temp = {...check};
      for( let i in temp){
        if(temp[i].check){
          return mapsQueries.deleteFavorite(map_id, user_id)
          .then( fav => {
             res.redirect('/maps/list')
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          })
        }
      }
      return mapsQueries.addFavorite(map_id, user_id)
      .then( fav => {
         res.redirect('/maps/list')
      })
    })
})

/*
 * Redirect back to profile page
 */
// POST /maps/favorite -- Add favorite map or Delete
router.post('/list/:userId/:mapId/favorite-profile', (req, res) => {
  const map_id = req.params.mapId;
  const user_id = req.params.userId;
  mapsQueries.checkIfFavoriteExist(map_id, user_id)
    .then (check => {
      let temp = {...check};
      for( let i in temp){
        if(temp[i].check){
          return mapsQueries.deleteFavorite(map_id, user_id)
          .then( fav => {
             res.redirect('/maps/list')
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          })
        }
      }
      return mapsQueries.addFavorite(map_id, user_id)
      .then( fav => {
         res.redirect(`/maps/${user_id}/profile`)
      })
    })
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

/*
********* Pins router
*/

// GET /maps/:mapId/pins -- Get all the pins from a map or maps
router.get('/:userId/:mapId/pins', (req, res) => {
  const map_id = req.params.mapId;
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
router.get('/list/:mapId/pins/:pinId', (req, res) => {
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
router.post('/:userId/:mapId/pins',upload1.single('Pin_image'), (req, res, next) => {
  const user_id = req.params.userId;
  const map_id = req.params.mapId;
  const pinDetails = { map_id, user_id, ...req.body }

  pinsQueries.addPin(pinDetails)
    .then( pins => {
      res.json(pins);
      next();
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

// router.get('maps/*', (req, res) => {
//   res.render("errorPage404");
// })



router.post('/:userId/:mapId/pins', upload1.single('Pin_image'),async (req, res, e) => {
  const { filename: image } = req.file;
   await sharp(req.file.path)
    .resize(295, 160)
    .webp({ quality: 90 })
    .toFile(
        path.resolve(req.file.destination,'resized',image)
    )
    fs.unlinkSync(req.file.path)
    e.preventdefault();
  //  res.redirect('/maps');
});


//Takes any image given
router.get('/2/create', (req, res) => {
  res.sendFile("./views/create-map.ejs");
});


//Reformats image to given criteria
  router.post('/', upload1.single('header_image'),async (req, res, e) =>  {
    const { filename: image } = req.file;
      await sharp(req.file.path)
      .resize(200, 200)
      .webp({ quality: 90 })
      .toFile(
        path.resolve(req.file.destination,'resized',image)
      )
      fs.unlinkSync(req.file.path)
      e.preventdefault();
      //  res.redirect('/maps');
  });



module.exports = router;


