const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")

const {
    getAllUsers, createOneUser
} = require("./controller.js")


// User routes
router.route("/users")
    .get(getAllUsers)
    .post(createOneUser)


module.exports = router