const express = require('express');
const router = express.Router();
const { generatePassword } = require("../public/scripts/generatePassword")
const { stripUrlToDomain } = require("../public/scripts/stripUrlToDomain")

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

    let uppercase;
    let spChar;
    let numbers;
    !req.body.uppercase ? uppercase = false : uppercase = true;
    !req.body.spChar ? spChar = false : spChar = true;
    !req.body.numbers ? numbers = false : numbers = true;

    let category = {id: 0};
    if (req.body.category === "uncategorized") {
      category.id = 0
    } else if (req.body.category === "social") {
      category.id = 1
    } else if (req.body.category === "entertainment") {
      category.id = 2
    } else if (req.body.category === "work") {
      category.id = 3
    }

    // let appObj = {id: 0};
    let domainName = stripUrlToDomain(req.body.website_url);
    console.log("this is the domain ====>", domainName);
    // wait for hatem to make the functions so that i can search domain exists in app_list

    let appCred = {
      username: req.body.username,
      password: generatePassword(uppercase, req.body.length, spChar, numbers)
    }

    createAppCredential(userObj, appCred, appObj, category);
    res.redirect('./new');
  });
  router.post("/:pass/update", (req, res) => {
    //update the password

  });
  return router;
};
