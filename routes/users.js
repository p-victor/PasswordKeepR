const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/login", (req, res) => {
    res.render("login");
  });
  router.get("/register", (req, res) => {
    res.render("register");
  });
  router.post("/new", (req, res) => {
    //implement the code to handle the post for creating a new user
  });
  return router;
};
