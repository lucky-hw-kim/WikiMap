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

app.use(express.static("public"));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
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
  res.redirect("/maps");
  // res.render("index");
});

app.get("/map/:id/add", (req, res) => {
  res.render("add-pin");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

//Renders the image submission page
app.get("/images", (req, res) => {
  res.render("images/image_index");
});

app.post("/edit", (req, res) => {
  res.render("edit-map");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


// Create a function to make a name for each image (id, user_id ...)
