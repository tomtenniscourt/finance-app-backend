const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")

const {
    getAllUsers
} = require("./controller.js")


// Getting One
router.route("/users").get(getAllUsers)


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