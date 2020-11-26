var express = require("express");
var router = express.Router();
var { User } = require("../../model/users");

router.post("/register", async (req, res) => {
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save();
  res.send(user);
});

module.exports = router;
