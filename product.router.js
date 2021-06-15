const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const { Product } = require('./model/product.model');

router.route("/")
  .get(async (req, res) => {
    let products = await Product.find({})
    res.json({ products, success: true, })
  })

  .post(async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    console.log(newProduct);
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json({success: true, product: savedProduct})
    }
    catch(e) {
      res.status(500).json({success: false, error: e})
    }
  });

router.route("/newrelease")
.get(async (req, res) => {
  let products = await Product.find({})
  res.json({ products, success: true, })
})

.post(async (req, res) => {
  const product = req.body;
  const newProduct = new Product(product);
  console.log(newProduct);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({success: true, product: savedProduct})
  }
  catch(e) {
    res.status(500).json({success: false, error: e})
  }
  
});





router.route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  })
  .post(async (req, res) => {
    const { id } = req.params
    const updateProduct = req.body
    const filter = {_id: id};
    let doc = await Product.findOneAndUpdate(filter, updateProduct, {new: true});

    res.status(201).json({ success: true, doc })
  })

module.exports = router;