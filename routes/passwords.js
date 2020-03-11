const express = require('express');
const router = express.Router();
const { generatePassword } = require("../public/scripts/generatePassword")
const { stripUrlToDomain } = require("../public/scripts/stripUrlToDomain")

module.exports = ({createAppCredential, findApp, createApp}) => {
  router.get("/new", (req, res) => {
    res.render("createPassword");

  });
  router.get("/:pass", (req, res) => {
    const templateVar = {passwordInfo: req.params.pass};
    res.render("passwords", templateVar);
  });
  router.post("/new", (req, res) => {
    //create new password

    let userObj = {id: req.session.user_id}
    let appObj = {}

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

    let appCred = {
      username: req.body.username,
      password: generatePassword(uppercase, req.body.length, spChar, numbers)
    }

    let domainName = stripUrlToDomain(req.body.website_url);
    // console.log("this is the domain ====>", domainName);
    // www.gsadasdsa.com
    findApp(domainName)
      .then(data => {
        if (data[0]) {
        appObj.id = data[0].id
          createAppCredential(userObj, appCred, appObj, category);
        } else {
          createApp(domainName, req.body.website_url)
            .then(data => {
              appObj.id = data[0].id
              createAppCredential(userObj, appCred, appObj, category)
            })
        }
      })

    res.redirect('./new');
  });
  router.post("/:pass/update", (req, res) => {
    //update the password

  });
  return router;
};
