const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/signin", (req, res) => {
    res.render("signIn");
  });
  router.get("/signup", (req, res) => {
    res.render("signUp");
  });
  router.post("/new", (req, res) => {
    //implement the code to handle the post for creating a new user
  });
  return router;
};
