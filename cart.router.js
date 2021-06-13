const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Cart } = require("./model/cart.model");

router
  .get("/", (req, res) => {
    res.status(200).json({success: true})
  })

  .post("/", async (req, res) => {
    const {username, cartItem} = req.body.user;
    const cartForUser = await Cart.find({});
    console.log(username);
    console.log(cartForUser);

    if(cartForUser.username === undefined || cartForUser.username === null) {
      let cartList = [cartItem];
      try {
        const newCart = new Cart({username, cartList});
        const savedCart = await newCart.save();
        res.status(201).json({success: true, data: savedCart, message: "Cart created!"})
      }
      catch(error) {
        res.status(500).json({success: false, error})    
      }
    }
    else {
      let cartList = cartForUser.cartList;
      console.log(cartList);
      res.status(200).json({success: true, cartList})
    }
  })

module.exports = router;