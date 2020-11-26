var mongoose = require("mongoose");
var Joi = require("joi");
var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//for sign up
function validateUser(data) {
  var schema = Joi.object({
    name: Joi.string().min(3).max(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(data);
}

function validateUserLogin() {
  var schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(data);
}

var User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateUserLogin = validateUserLogin;
