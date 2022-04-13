// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
module.exports = db;
//db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const mapsRoutes = require("./routes/maps-router");


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/maps", mapsRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

<<<<<<< HEAD

app.get("/images", (req, res) => {
  res.render("images/image_index");
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/condensed_image/uploads/');
  },

  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.webp');
  }
});

var upload = multer({ storage: storage })


app.get('/images', (req, res) => {
  res.sendFile(__dirname + '/image_index.html');
});

app.post('/images', upload.single('image'),async (req, res) => {
       const { filename: image } = req.file;

       await sharp(req.file.path)
        .resize(200, 200)
        .webp({ quality: 90 })
        .toFile(
            path.resolve(req.file.destination,'resized',image)
        )
        fs.unlinkSync(req.file.path)

       res.redirect('/images');
=======
// app.get("/profile", (req, res) => {
//   res.render("profile");
// });

// app.get("/maps", (req, res) => {
//   res.render("maps");
// });


app.get("*", (req, res) => {
  res.render("errorPage404");
});

app.post("/view", (req, res) => {

  $templatevars = {

  }

  res.render("map-view", $templatevars);
});

app.get("/view", (req, res) => {
  res.render("map-view");
});

app.get("/favorites", (req, res) => {
  res.render("profile");
});

app.get("/saved", (req, res) => {
  res.render("profile");
>>>>>>> ca4d91edb6c9a0fcedf517dc9b43006e41b5eeec
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


