const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');

const { Auth } = require("./model/auth.model");

const secret = "ksdnfaisodjfaiofj";
 

router.post("/login", async (req, res) => {
  const { username, password } = req.body.user;
  const user = await Auth.find({username});
  const token = jwt.sign({ userID: username}, secret, { expiresIn: '24h'})
  res.json({ username, token })
})

router.post("/signup", async (req, res) => {
  const user = req.body.user;
  const newUser = new Auth(user);
  try {
      const savedUser = await newUser.save();
      res.status(201).json({success: true, user: savedUser, message: "Signed up!"})
    }
    catch(e) {
      res.status(500).json({success: false, error: e})
    }
})

router.get('/user', (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log({ token })
    const decoded = jwt.verify(token, secret);
    res.json(decoded);
  }
  catch (error) {
    console.log(error)
    return res.status(401).json({ message: "Unauthorised access, please add the token"})
  }
  
});

module.exports = router;