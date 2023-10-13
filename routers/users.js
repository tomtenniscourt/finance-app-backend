const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")

const {
    getAllUsers,
    createOneUser,
    getOneUser,
    updateOneUser,
    deleteOneUser,
    checkUserData

} = require("./controller.js")


// User routes
router.route("/users")
    .get(getAllUsers)
    .post(createOneUser)

router.route("/users/:id")
    .get(getOneUser)
    .put(updateOneUser)
    .delete(deleteOneUser)

router.route("/users/login")
    .post(checkUserData)
    
module.exports = router