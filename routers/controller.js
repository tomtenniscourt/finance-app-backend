const express = require("express")
const userSchema = require("../models/user")
const bcrypt = require("bcrypt")

// ***** USER ROUTES *****

// GET REQUESTS
// Get All
const getAllUsers = async(req,res) => {
    try {
        const users = await userSchema.find()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

// Get One
const getOneUser = async (req,res) => {
    try {
        const user = await userSchema.findById(req.params.id)
        res.json(user)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

// POST REQUESTS
// Create One User
const createOneUser = async(req,res) => {
    const user = new userSchema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log("Salt: ", salt)
        console.log("Hashed password: ", hashedPassword)
        res.status(201).json(newUser)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

// PUT REQUESTS
// Update One User
const updateOneUser = async (req,res) => {
    try {
        const user = await userSchema.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json(user)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

// DELETE REQUESTS
// Delete One USer
const deleteOneUser = async (req, res) => {
    try {
        const user = await userSchema.findByIdAndDelete(req.params.id)
        res.status(201).json(user)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getAllUsers,
    createOneUser,
    getOneUser,
    updateOneUser,
    deleteOneUser
}

