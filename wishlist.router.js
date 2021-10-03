const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Wishlist } = require("./model/wishlist.model");

router
  .get("/", async (req, res) => {
    let {username} = req.query;
    let wishlistForUser = await Wishlist.findOne({username});
    res.status(200).json({success: true, wishlistForUser})
  })

  .post("/", async (req, res) => {
    const {username, wishItem, action} = req.body.query;
    let wishListForUser = await Wishlist.findOne({username});

    if(action === "add") {
      if(wishListForUser === undefined || wishListForUser === null) {
      let wishlist = [wishItem];
      try {
        const newWishList = new Wishlist({username, wishlist});
        const savedWishList = await newWishList.save();
        res.status(201).json({success: true, data: savedWishList, message: "Wishlist created!"})
      }
      catch(error) {
        res.status(500).json({success: false, error});    
      }
    }
    else {
      try {
        let {wishlist} = wishListForUser;
          for(let i = 0; i < wishlist.length; i++) {
            if(wishlist[i].id === wishItem) {
              throw new Error("Item Already exists")
            }
          } 
        wishlist = [...wishListForUser.wishlist, wishItem];
        const newWishList = await Wishlist({username, wishlist});
        //first delete the existing document and then save new document
        await Wishlist.deleteOne({ username });
        const savedWishList = await newWishList.save();
        res.status(201).json({success: true, savedWishList});
      }
      catch(error) {
        res.status(500).json({success: false, error});    
      }
    }
      
    }
    else if(action === "remove") {
      try {
        let wishlist = wishListForUser.wishlist.filter(item => item !== wishItem);
        const newWishList = await Wishlist({username, wishlist});
        //first delete the existing document and then save new document
        await Wishlist.deleteOne({ username });
        const savedWishList = await newWishList.save();
        res.status(204).json({success: true, savedWishList});
      }
      catch(error) {
        res.status(500).json({success: false, error});
      }
    }
    
  })

module.exports = router;