const express = require("express");
const userSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// ***** USER ROUTES *****

// GET REQUESTS
// Get All
const getAllUsers = async (req, res) => {
  try {
    const users = await userSchema.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get One
const getOneUser = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST REQUESTS
// Create One User
const createOneUser = async (req, res) => {
  try {
    // 10 refers to the salt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new userSchema({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Check user login details match database item.
const checkUserData = async (req, res, next) => {
  const userEmail = req.body.email;
  // find user in database according to provided user email
  const user = await userSchema.findOne({ email: userEmail });

  if (!user) {
    // this runs when a user email doesn't exist, but not if the pass doesn't match DB
    res.status(500).send("Can't find user");
  }
// if there's a match, compare the provided password with the password in the database
  try {
    if ( await bcrypt.compare(req.body.password, user.password)) {
      // removed the successful login console log as only one response can be given per request,
      // calling next() and the subsequent response causes an error.
        req.userEmail = userEmail
        req.loginSuccess = true
        next()
        
    } else {
        req.loginSuccess = false
        next()
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const handleJWT = async (req,res) => {
  if (req.loginSuccess) {
    const userEmail = req.userEmail
// (Data for token, secret key to encrypt with)
const accessToken = jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET)
// assuming the userEmail was authenticated correctly in the checkUserDetails function,
// the encrypted user details will be encrypted in the accessToken, then returned as JSON below
res.json({ accessToken: accessToken})
  } else {
    // if req.loginSuccess is false (set in checkUserDetails).
    // This runs when the emails match but the password does not.
    res.send("Failure - Not Authorized");
  }
}

// PUT REQUESTS
// Update One User
const updateOneUser = async (req, res) => {
  try {
    const user = await userSchema.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE REQUESTS
// Delete One USer
const deleteOneUser = async (req, res) => {
  try {
    const user = await userSchema.findByIdAndDelete(req.params.id);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  createOneUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
  checkUserData,
  handleJWT
};
