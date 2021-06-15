const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');

const { Auth } = require("./model/auth.model");

const secret = "ksdnfaisodjfaiofj";
 

router.post("/login", async (req, res) => {
  const { uname, pswd } = req.body;
  try {
    const {username, password} = await Auth.findOne({username: uname});
    if(pswd === password) {
      const token = jwt.sign({ userID: username}, secret, { expiresIn: '24h'})
      return res.status(201).json({ success: true, username, token })
    }
    else {
      return res.status(401).json({ success: false, message: "Unauthorised access"})  
    }
  }
  catch (error) {
    return res.status(500).json({ success: false, error})
  }
})

router.post("/signup", async (req, res) => {
  const user = req.body.user;
  const newUser = new Auth(user);
  try {
      const savedUser = await newUser.save();
      res.status(201).json({success: true, user: savedUser, message: "Signed up!"})
    }
    catch(error) {
      res.status(500).json({success: false, error})
    }
})

router.get('/user', (req, res) => {
  try {
    const token = req.headers.authorization;
    const {userID} = jwt.verify(token, secret);
    res.status(200).json({success: true, userID});
  }
  catch (error) {
    console.log(error)
    return res.status(401).json({ message: "Unauthorised access, please add the token"})
  }
  
});

module.exports = router;