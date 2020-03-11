const express = require('express');
const router = express.Router();
const { generatePassword } = require("../public/scripts/generatePassword")
const { stripUrlToDomain } = require("../public/scripts/stripUrlToDomain")

module.exports = ({ createAppCredential, findApp, createApp }) => {
  router.get("/new", (req, res) => {
    res.render("createPassword");

  });
  router.get("/:pass", (req, res) => {
    const templateVar = { passwordInfo: req.params.pass };
    res.render("passwords", templateVar);
  });
  router.post("/new", (req, res) => {
    //create new password

    let userObj = { id: req.session.user_id }
    let appObj = {}
    let uppercase = !req.body.uppercase ? false : true;
    let spChar = !req.body.spChar ? false : true;
    let numbers = !req.body.numbers ? false : true;
    const category = {id: ["uncategorized", "social", "entertainment", "work"].indexOf(req.body.category)};
    let appCred = {
      username: req.body.username,
      password: generatePassword(uppercase, req.body.length, spChar, numbers)
    }
    const appName = req.body.app_name;
    findApp(appName)
    .then(data => {
      data[0] ?
          createAppCredential(userObj, appCred, {id: data[0].id}, category) : createApp(appName, req.body.website_url).then(app => createAppCredential(userObj, appCred, {id: app.id}, category))
      }).catch(e => console.log(e))

    res.redirect('./new');
  });
  router.post("/:pass/update", (req, res) => {
    //update the password

  });
  return router;
};
