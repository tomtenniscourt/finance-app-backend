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



module.exports = {
    getAllUsers
}

