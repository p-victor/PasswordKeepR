const express = require('express');
const router = express.Router();
const { verifyLoginInfo, verifyRegisterInfo } = require('../public/scripts/helper');
const bcrypt = require('bcrypt');

module.exports = ({ createUserAccount, getUserByEmail }) => {
  router.get("/login", (req, res) => {
    res.render("login");
  });
  router.post("/login", (req, res) => {
    getUserByEmail(req.body.email).then(query => {
      verifyLoginInfo(req.body.email, req.body.password, query[0])
        .then(verifyLoginResult => {
          if (verifyLoginResult) {
            req.session.user_id = query[0].id;
            res.redirect('/');
          } else {
            res.status(400).send("Status 400");
          }
        })
    }).catch(e => console.log(e));
  });

  router.get("/register", (req, res) => {
    res.render("register");
  });
  router.post("/register", (req, res) => {
    getUserByEmail(req.body.email).then(query => {
      if (verifyRegisterInfo(req.body.email, req.body.password, query[0])) {
        bcrypt.hash(req.body.password, 10)
          .then(hashedPassword => createUserAccount({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: null
          })
            .then(query => {
              res.redirect("/users/login");
            }))
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
