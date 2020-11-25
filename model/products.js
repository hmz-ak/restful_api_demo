var mongoose = require("mongoose");
const Joi = require("joi");
var productSchema = mongoose.Schema({
  name: String,
  price: Number,
});

//joi library is being used for validation
function validateProduct(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(data);
}
var product = mongoose.model("Product", productSchema);

module.exports.Product = product;
module.exports.validate = validateProduct;
