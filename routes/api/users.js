var express = require("express");
var router = express.Router();
var { User } = require("../../model/users");
var bcrypt = require("bcryptjs");
var _ = require("lodash");

router.post("/register", async (req, res) => {
  var email = req.body.email;
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User with this email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  var salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["name", "email"]));
});

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("This email is not registered");
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).send("Password incorrect");
  res.send("login successful");
});

module.exports = router;
