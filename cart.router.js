const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Cart } = require("./model/cart.model");

router
  .get("/", async (req, res) => {
    let {username} = req.query;
    let cartForUser = await Cart.findOne({username});
    res.status(200).json({success: true, cartForUser})
  })

  .post("/", async (req, res) => {
    const {username, cartItem, action, actiontype} = req.body.query;
    let cartForUser = await Cart.findOne({username});
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
          let {cartList} = cartForUser;
          for(let i = 0; i < cartList.length; i++) {
            if(cartList[i].id === cartItem) {
              throw new Error("Item Already exists")
            }
          } 
          let item = {
            id: cartItem,
            quantity: 1
          } 
          cartList = [...cartForUser.cartList, item];
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
        let cartList = cartForUser.cartList.filter(item => item.id !== cartItem);
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
    else if(action === "update") {
      let cartList = [];
      try {
        if(actiontype === "INC") {
          cartList = cartForUser.cartList.map(item => {
            if(item.id === cartItem && item.quantity < 4) {
              item.quantity = item.quantity + 1;
            }
            return item;
          })
          const newCart = await Cart({username, cartList});
          //first delete the existing document and then save new document
          await Cart.deleteOne({ username });
          const savedCart = await newCart.save();
          res.status(201).json({success: true, savedCart});
        }
        else if(actiontype === "DESC") {
          cartList = cartForUser.cartList.map(item => {
            if(item.id === cartItem && item.quantity > 0) {
              item.quantity = item.quantity - 1;
            }
            return item;
          })
          const newCart = await Cart({username, cartList});
          //first delete the existing document and then save new document
          await Cart.deleteOne({ username });
          const savedCart = await newCart.save();
          res.status(201).json({success: true, savedCart});
        }
      }
      catch(error) {
        res.status(500).json({success: false, error});    
      }
    }
  })

module.exports = router;