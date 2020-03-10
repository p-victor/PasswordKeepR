const express = require('express');
const router = express.Router();
const { generatePassword } = require("../public/scripts/generatePassword")

module.exports = ({createAppCredential}) => {
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

    let userObj = {id: 1}
    let appObj = {id: 1}
    let catObj = {id: 0}

    let uppercase;
    let spChar;
    let numbers;

    !req.body.uppercase ? uppercase = false : uppercase = true;
    !req.body.spChar ? spChar = false : spChar = true;
    !req.body.numbers ? numbers = false : numbers = true;



    let appCred = {
      username: req.body.username,
      password: generatePassword(uppercase, req.body.length, spChar, numbers)
    }

    createAppCredential(userObj, appCred, appObj, catObj);
    res.redirect('./new');
  });
  router.post("/:pass/update", (req, res) => {
    //update the password

  });
  return router;
};
