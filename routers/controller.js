const express = require("express")
const userSchema = require("../models/user")


// Getting All
const getAllUsers = async(req,res) => {
    try {
        const users = await userSchema.find()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

// Create one user
const createOneUser = async(req,res) => {
    console.log('req body',req.body)
    const user = new userSchema({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getAllUsers,
    createOneUser
}

