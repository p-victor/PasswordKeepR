const express = require('express');
const router = express.Router();
const { verifyLoginInfo, verifyRegisterInfo } = require('../public/scripts/helper');

module.exports = ({ getAppCredentialsbyViewerId, getAppCredentialsbyOwnerId, getAllCategories }) => {
  router.get("/sidebar", (req, res) => {
    console.log(req.session.user_id);
    const id = req.session.user_id;

    Promise.all([ getAppCredentialsbyOwnerId(id), getAppCredentialsbyViewerId(id)])
    .then(userAppCredentialsList => res.send(userAppCredentialsList));
  });
  router.get("/categories", (req, res) => {
    getAllCategories()
    .then( query => res.send(query));
  })

  return router;
};
