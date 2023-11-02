const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")

const {
    getAllUsers,
    createOneUser,
    getOneUser,
    updateOneUser,
    deleteOneUser,
    checkUserData,
    handleJWT,
    authenticateToken
} = require("./controller.js")


// User routes
router.route("/register")
    .post(createOneUser)

router.route("/login")
    .post([checkUserData, handleJWT])

router.route("/users")
    .get(getAllUsers)

router.route("/users/:id")
    .get([authenticateToken, getOneUser])
    .put([authenticateToken, updateOneUser])
    .delete([authenticateToken, deleteOneUser])
    
module.exports = router