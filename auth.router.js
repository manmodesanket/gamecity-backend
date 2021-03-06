const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');

const { Auth } = require("./model/auth.model");

const secret = process.env['secret'];
 

router.post("/login", async (req, res) => {
  const { uname, pswd } = req.body;
  try {
    const { username, password, displayName } = await Auth.findOne({ username: uname });
    if(pswd === password) {
      const token = jwt.sign({ userID: username, displayName}, secret, { expiresIn: '24h'})
      return res.status(201).json({ success: true, username, token, displayName })
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
  const {uname, pswd, displayName} = req.body.user;
  
  try {
      const response = await Auth.findOne({username: uname});
      if(response !== null) {
         res.status(409).json({success: false, message: "Username Already Exist!"})
      }
      else {
        const newUser = new Auth({username: uname, password: pswd, displayName});
        const savedUser = await newUser.save();
        const token = jwt.sign({ userID: uname}, secret, { expiresIn: '24h'})
        res.status(201).json({success: true, user: savedUser.username, token, message: "Signed up!"});
      }
    }
    catch(error) {
      res.status(500).json({success: false, error})
    }
})

router.get('/user', (req, res) => {
  try {
    const token = req.headers.authorization;
    const {userID, displayName} = jwt.verify(token, secret);
    res.status(200).json({success: true, userID, displayName});
  }
  catch (error) {
    return res.status(401).json({ message: "Unauthorised access, please add the token"})
  }
  
});

module.exports = router;