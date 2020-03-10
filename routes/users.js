const express = require('express');
const router = express.Router();
const {verifyLoginInfo, verifyRegisterInfo} = require('../public/scripts/helper');

module.exports = ({createUserAccount, getUserByEmail}) => {
  router.get("/login", (req, res) => {
    res.render("login");
  });
  router.post("/login", (req, res) => {
    getUserByEmail(req.body.email).then(query => {
      if (verifyLoginInfo(req.body.email, req.body.password, query[0])) {
        req.session.user_id = query[0].id;
        res.redirect('/');
      } else {
        res.status(400).send("Status 400");
      }
    }).catch(e => console.log(e));
  });

  router.get("/register", (req, res) => {
    res.render("register");
  });
  router.post("/register", (req, res) => {
    getUserByEmail(req.body.email).then(query => {
      if (verifyRegisterInfo(req.body.email, req.body.password, query[0])) {
        createUserAccount({
          name: "name",
          email: req.body.email,
          password: req.body.password,
          phone: null
        })
          .then(query => {
            req.session.user_id = query.id;
            res.redirect("/");
          })
          .catch(e => console.log(e));
      } else {
        res.status(400).send("Status 400");
      }
    }).catch(e => console.log(e));
  });

  router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
  });

  return router;
};
