// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const cookieSession = require('cookie-session');
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Cookie session setup
app.use(cookieSession({ name: 'session', keys: ["user_id"], maxAge: 24 * 60 * 60 * 1000 /*24 hours*/ }));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//#########login middleware
// app.use((req, res, next) => {
//   const allowedPaths = ['/users/signin', '/users/signup']
//   if ( req.session.user_id || allowedPaths.some(allowedPath => req.path.startsWith(allowedPath))) {
//     next();
//   }
//   else {
//     res.redirect('/users/signin');
//   }
// });

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const passwordsRoutes = require("./routes/passwords");

// Mount all resource routes
app.use("/users", usersRoutes(db));
app.use("/passwords", passwordsRoutes(db));

// Home page
app.get("/", (req, res) => {
  res.render("createPassword");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
