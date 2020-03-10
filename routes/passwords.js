const express = require('express');
const router = express.Router();
const { createAppCredential } = require("../public/scripts/database")

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
    console.log(req.body)

    let userObj = {
      id: 1
    }

    let appObj = {
      id: 1
    }

    let catObj = {
      id: 0
    }

    let appCred = {
      username: req.body.username,
      password: "eric was here"
    }

    createAppCredential(userObj, appCred, appObj, catObj);


  });
  router.post("/:pass/update", (req, res) => {
    //update the password

  });
  return router;
};
