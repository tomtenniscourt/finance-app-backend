const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")

const {
    getAllUsers,
    createOneUser,
    getOneUser
} = require("./controller.js")


// User routes
router.route("/users")
    .get(getAllUsers)
    .post(createOneUser)

router.route("/users/:id")
    .get(getOneUser)

module.exports = router