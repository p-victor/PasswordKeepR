const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/new", (req, res) => {
    res.render("createPassword");
  });
  router.get("/:pass", (req, res) => {
    const templateVar = {passwordInfo: req.params.pass};
    res.render("passwords", templateVar);
  });
  router.post("/new", (req, res) => {
    //create new password

  });
  router.post("/:pass/update", (req, res) => {
    //update the password

  });
  return router;
};
