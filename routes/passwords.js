const express = require('express');
const router = express.Router();
const { generatePassword } = require("../public/scripts/generatePassword")

module.exports = ({ revokeAccessOfOneViewerByAppCredentialId, createAppCredential, findApp, createApp, getAppCredentialById, findAppById, getAppCredentialsbyOwnerId, getAppCredentialByViewerId, getUserById, getUserByName, createAppCredentialForViewer, AllsharedByAppCredential }) => {
  router.get("/:passId", (req, res) => {
    getAppCredentialById({ id: req.params.passId })
      .then(appCredential => {
        AllsharedByAppCredential(appCredential[0].id)
          .then(sharedAccesses => {
            const templateVar = { passwordInfo: appCredential[0], sharedAccesses: sharedAccesses };
            res.render("passwords", templateVar);
          });
      });
  });
  router.get("/new", (req, res) => {
    res.render("createPassword");
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
    return findApp(appName)
      .then(apps => {
        if (apps[0]) {
          return createAppCredential(userObj, appCred, { id: apps[0].id }, category)
        } else {
          return createApp(req.body.app_name, req.body.website_url)
            .then(apps => {
              return createAppCredential(userObj, appCred, { id: apps[0].id }, category);
            });
        }
      })
      .then(res.redirect("/"));
  });
  router.post("/:passId/update", (req, res) => {
    // getAppCredentialById
  });

  router.post("/:passId/share", (req, res) => {
    //update the password
    return getUserByName(req.body.share)
      .then(viewer => {
        return getAppCredentialsbyOwnerId(req.session.user_id)
          .then(ownedAppCredentials => {
            const appCredId = ownedAppCredentials.find(appCredential => appCredential.id == req.params.passId).id;
            AllsharedByAppCredential(appCredId)
              .then(sharedAccesses => {
                if (!sharedAccesses.find(sharedAccess => sharedAccess.viewer_id == viewer[0].id)) {
                  return createAppCredentialForViewer(appCredId, viewer[0].id)
                }
              })
          })
      })
      .then(res.redirect("back"))
      .catch("no user entered")
  });
  router.post("/:passId/share/:viewerId/delete", (req, res) => {
    return getUserById(req.params.viewerId)
      .then(viewer => {
        return getAppCredentialsbyOwnerId(req.session.user_id)
          .then(ownedAppCredentials => {
            const appCredId = ownedAppCredentials.find(appCredential => appCredential.id == req.params.passId).id;
            return revokeAccessOfOneViewerByAppCredentialId(appCredId, viewer[0].name)
          })
      })
      .then(res.redirect("back"))
  });
  router.get("/:passId/view", (req, res) => {
    getAppCredentialById({ id: req.params.passId })
      .then(appCredential => {
        AllsharedByAppCredential(appCredential[0].id)
          .then(sharedAccesses => {
            const templateVar = { passwordInfo: appCredential[0], sharedAccesses: sharedAccesses };
            res.render("passwordsView", templateVar);
          });
      });
  });

  return router;
};

