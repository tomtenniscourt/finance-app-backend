const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")

// Getting All
router.get("/", async (req,res) => {
    try {
        const users = await userSchema.find()
        res.json(users)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting One

// Creating One
router.post("/", async (req,res) => {
    const user = new userSchema({
        name: req.body.name,
        email: req.body.email
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
})
// Updating One

// Deleting One

module.exports = router