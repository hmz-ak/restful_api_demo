var express = require("express");
var router = express.Router();
var { Product } = require("../../model/products");
var validateProduct = require("../../middleware/validate");
var auth = require("../../middleware/auth");
var admin = require("../../middleware/admin");

//get all the records
router.get("/", async (req, res) => {
  console.log(req.user);
  //pagination
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecord = perPage * (page - 1);
  var products = await Product.find().skip(skipRecord).limit(perPage);
  return res.send(products);
});

//get single record
router.get("/:id", auth, async (req, res) => {
  try {
    var products = await Product.findById(req.params.id);
    if (!products) return res.send("Product could not be found");
    return res.send(products);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

//update a product
router.put("/:id", auth, validateProduct, async (req, res) => {
  var product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

//delete a product
router.delete("/:id", auth, admin, async (req, res) => {
  var product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});

//add a new product
router.post("/", auth, validateProduct, async (req, res) => {
  var product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  return res.send(product);
});

module.exports = router;
