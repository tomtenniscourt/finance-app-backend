const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")

const getUserViaId = async (req,res,next) => {
    let user;
    try {
        // find the user via their id
        user = await userSchema.findById(req.params.id)
        // if there is no user id, then return an error
        if (user == null) {
            return res.status(404).json({message: "Can't find user"})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}

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
router.get("/:id", getUserViaId, (req,res) => {
    res.send(res.user.name)
})

// Creating One
router.post("/", async (req,res) => {
    console.log('req body',req.body)
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