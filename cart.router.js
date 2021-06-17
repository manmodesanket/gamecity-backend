const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Cart } = require("./model/cart.model");
const { Auth } = require("./model/auth.model");

router
  .get("/", (req, res) => {
    res.status(200).json({success: true})
  })

  .post("/", async (req, res) => {
    const {username, cartItem, action} = req.body;
    let cartForUser = await Cart.findOne({username});
    //const user = await Auth.find({username});

    if(action === "add") {
      if(cartForUser === undefined || cartForUser === null) {
      let cartList = [cartItem];
      try {
        const newCart = new Cart({username, cartList});
        const savedCart = await newCart.save();
        res.status(201).json({success: true, data: savedCart, message: "Cart created!"})
      }
      catch(error) {
        res.status(500).json({success: false, error});    
      }
    }
    else {
      try {
        let cartList = [...cartForUser.cartList, cartItem];
        const newCart = await Cart({username, cartList});
        //first delete the existing document and then save new document
        await Cart.deleteOne({ username });
        const savedCart = await newCart.save();
        res.status(201).json({success: true, savedCart});
      }
      catch(error) {
        res.status(500).json({success: false, error});    
      }
    }
      
    }
    else if(action === "remove") {
      try {
        let cartList = cartForUser.cartList.filter(item => item !== cartItem);
        const newCart = await Cart({username, cartList});
        //first delete the existing document and then save new document
        await Cart.deleteOne({ username });
        const savedCart = await newCart.save();
        res.status(204).json({success: true, savedCart});
      }
      catch(error) {
        res.status(500).json({success: false, error});    
      }
    }
  })

module.exports = router;