const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Cart } = require("./model/cart.model");
const { Auth } = require("./model/auth.model");

router
  .get("/", async (req, res) => {
    let {username} = req.query;
    let cartForUser = await Cart.findOne({username});
    res.status(200).json({success: true, cartForUser})
  })

  .post("/", async (req, res) => {
    const {username, cartItem, action} = req.body;
    let cartForUser = await Cart.findOne({username});
    //const user = await Auth.find({username});

    if(action === "add") {
      if(cartForUser === undefined || cartForUser === null) {
      let item = {
        id: cartItem,
        quantity: 1
      }  
      let cartList = [item];
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

        let item = {
          id: cartItem,
          quantity: 1
        }  
        let cartList = [...cartForUser.cartList, item];
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
        console.log(cartItem);
        let cartList = cartForUser.cartList.filter(item => item.id !== cartItem);
        const newCart = await Cart({username, cartList});
        //first delete the existing document and then save new document
        await Cart.deleteOne({ username });
        const savedCart = await newCart.save();
        console.log(savedCart);
        res.status(204).json({success: true, savedCart});
      }
      catch(error) {
        res.status(500).json({success: false, error});    
      }
    }
  })

module.exports = router;