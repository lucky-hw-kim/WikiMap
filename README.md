Wiki Maps 🌄
=========
Wiki Maps is a web app that allows users to collaborate to create maps, list multiple points of interest, favorite their favorite maps, and share them with others.

### 📋 Features:
- users can see a list of the available maps
- users can view a map
- a map can contain many points
- each point can have: a title, description, and image
- authenticated users can create maps
- authenticated users can modify maps (add, edit, remove points)
- users can favourite a map
- users have profiles, indicating their favourite maps and maps they've contributed to

### 🚧 This was published for collaborative learning purposes.

This project was created and published by [Lucky Kim](https://github.com/lucky-hw-kim), [Matt Lawson](https://github.com/MattLawson98), and [Matthew Seligman](https://github.com/MattSeligman) as part of our midterm project at Lighthouse Labs. We welcome any feedback!

Note: Our most recent github merge was directed towards demonstration and some features may have become non-functional after our most recent merge.

### 💬 Contributors
- [Lucky kim](https://github.com/lucky-hw-kim)
- [Matt Lawson](https://github.com/MattLawson98)
- [Matthew Seligman](https://github.com/MattSeligman)

### 😄 Collaborative Goals

- ✅ Build a web app from start to finish using the tech and approaches learned to date
- ✅ Turn requirements into a working product
- ✅ Practice architecting an app in terms of UI/UX, Routes/API and Database
- ✅ Manage a multi-developer project with git
- ✅ Simulate the working world where you do not always get to completely cherry pick your team, stack or product features
- ✅ Track each meeting with Meeting Minutes keeping us on track for our actionable goals [ 📗 Internal Stretch Goal ]
- ✅ Practice demoing an app to help prepare for the final project and employer interviews

## 📐 Entity Relationship Diagram

* Wiki Map's Database Layout
  ![Entity Relationship Diagram](/doc/wiki-map_erd.jpg)


## 📖 Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## 🔧 Dependencies

- Node 10.x or above
- NPM 5.x or above
- [chalk](https://www.npmjs.com/package/chalk) - Terminal string styling done right.
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
- [ejs](https://www.npmjs.com/package/ejs) - Embedded JavaScript templates
- [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js.
- [Multer](https://www.npmjs.com/package/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
- [pg](https://www.npmjs.com/package/pg) - PostgreSQL client - pure javascript & libpq with the same API.
- [sass](https://www.npmjs.com/package/sass) - A pure JavaScript implementation of Sass.

- [Sharp](https://www.npmjs.com/package/sharp) - Sharp converts large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.

- [LeafletJS](https://github.com/Leaflet/Leaflet) - Leaflet is an open source JavaScript library used to build web mapping applications.

- [Animations.css](https://github.com/animate-css/animate.css) - Animate.css is a library of ready-to-use, cross-browser animations for you to use in your projects.

- [Leaflet-locatecontrol](https://github.com/domoritz/leaflet-locatecontrol) - A leaflet control to geolocate the user.

- [Lottie Files](https://lottiefiles.com/100626-404-page-error) - Lightweight, scalable JSON Vector animations for your Apps.


### 💻 Screenshots:

* Guest & Login / Register
  * ![Guest & Login / Register](/doc/00-guest-or-login-and-explore.gif)

* Create a Map
  * ![Create a Map](/doc/01-create-a-map.gif)

* Create a Pin
  * ![Create a Pin](/doc/02-create-a-pin.gif)

* Update a Map
  * ![Update a Map](/doc/03-update-a-map.gif)

* User Geo Location
  * ![User Geo Location](/doc/04-user-geo-location.gif)

* File Optimization (Using Multer and Sharp)
  * ![File Optimization](/doc/05-file-optimization.jpg)

* Favorite Map
  * ![Favorite Maps](/doc/06-favorite-maps.gif)

* List of Maps
  * ![List of Maps](/doc/07-list-of-maps.jpg)

* Call to Actions
  * ![Call to Actions](/doc/08-call-to-actions.gif)

* Page not Found Support 
  * ![Page not Found Support](/doc/09-page-not-found.gif)
