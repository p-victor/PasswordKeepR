const express = require('express');
const router = express.Router();
const { verifyLoginInfo, verifyRegisterInfo } = require('../public/scripts/helper');

module.exports = ({ getAppCredentialsbyViewerId, getAppCredentialsbyOwnerId, getAllCategories }) => {
  router.get("/sidebar", (req, res) => {
    console.log(`connected as user: ${req.session.user_id}`);
    const id = req.session.user_id;
    Promise.all([ getAppCredentialsbyOwnerId(id), getAppCredentialsbyViewerId(id)])
    .then(userAppCredentialsList => res.send(userAppCredentialsList)).catch(e => console.log("API couldnt get sidebar info"));
  });
  router.get("/categories", (req, res) => {
    getAllCategories()
    .then( query => res.send(query)).catch(e => console.log("API couldnt get categories info"));
  })

  return router;
};
