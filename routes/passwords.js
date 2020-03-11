const express = require('express');
const router = express.Router();
const { generatePassword } = require("../public/scripts/generatePassword")
const { stripUrlToDomain } = require("../public/scripts/stripUrlToDomain")

module.exports = ({createAppCredential, findApp, createApp, getAppCredentialById, findAppById}) => {
  router.get("/new", (req, res) => {
    res.render("createPassword");

  });
  router.get("/:passId", (req, res) => {



    let obj = {id: req.params.passId}
    getAppCredentialById(obj)
    .then(data => {
        const templateVar = {passwordInfo: data[0]}


        let appId = data[0].app_id

        return findAppById(appId)
          .then(data => {
            console.log("heyyyyyyyyyy")
            console.log(data)
            templateVar.appName = data[0].name;
            res.render("passwords", templateVar)
            })
      })
  });
  router.post("/new", (req, res) => {
    //create new password

    let userObj = { id: req.session.user_id }
    let appObj = {}
    let uppercase = !req.body.uppercase ? false : true;
    let spChar = !req.body.spChar ? false : true;
    let numbers = !req.body.numbers ? false : true;
    const category = { id: ["uncategorized", "social", "entertainment", "work"].indexOf(req.body.category) };
    let appCred = {
      username: req.body.username,
      password: generatePassword(uppercase, req.body.length, spChar, numbers)
    }
    const appName = req.body.app_name;
    findApp(appName)
      .then(data => {
        if (data[0]) {
          createAppCredential(userObj, appCred, { id: data[0].id }, category)
            .catch(console.log("createAppCredential failed"));
        } else {
          createApp(appName, req.body.website_url)
            .then(app => createAppCredential(userObj, appCred, { id: app.id }, category).catch(console.log("createAppCredential failed")))
            .catch(console.log("createApp failed"));
        }
      }).catch(e => console.log(e))
    res.redirect('./new');
  });
  router.post("/:pass/update", (req, res) => {
    //update the password

  });

  router.post("/:pass/share/:user", (req, res) => {
    //update the password

  });
  return router;
};
