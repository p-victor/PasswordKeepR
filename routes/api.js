const express = require('express');
const router = express.Router();

module.exports = ({ getUserById , getAppCredentialsbyViewerId, getAppCredentialsbyOwnerId, getAllCategories }) => {
  router.get("/sidebar", (req, res) => {
    const id = req.session.user_id;
    Promise.all([ getAppCredentialsbyOwnerId(id), getAppCredentialsbyViewerId(id)])
    .then(userAppCredentialsList => res.send(userAppCredentialsList)).catch(e => console.log("API couldnt get sidebar info"));
  });
  router.get("/categories", (req, res) => {
    getAllCategories()
    .then( query => res.send(query)).catch(e => console.log("API couldnt get categories info"));
  })
  router.get("/header", (req, res) => {
    const id = req.session.user_id || 0;
    getUserById(id)
    .then(user => res.send(user));
  });

  return router;
};
