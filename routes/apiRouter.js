const express = require("express");
const router = express.Router();
const db = require("../models");


// get all users
router.get("/all", (req, res) => {
  db.users.findAll().then(users => res.send(users));
});



// get single users by id
router.get("/find/:id", (req, res) => {
  db.users.findAll({
    where: {
      id: req.params.id
    }
  }).then(users => res.send(users));
});


// post new users
router.post("/new", (req, res) => {
  db.users.create({
    text: req.body.text
  }).then(submitedusers => res.send(submitedusers));
});



// delete users
router.delete("/delete/:id", (req, res) => {
  db.users.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});



// edit a users
router.put("/edit", (req, res) => {
  db.users.update(
    {
      text: req.body.text
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});



module.exports = router;







