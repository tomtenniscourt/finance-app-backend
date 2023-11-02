const express = require("express")
const router = express.Router()
const userSchema = require("../models/user")

const {
    getAllUsers,
    createOneUser,
    getCurrentUser,
    updateOneUser,
    deleteOneUser,
    checkUserData,
    handleJWT,
    authenticateToken,
    regenerateAccessToken
} = require("./controller.js")


// User routes
router.route("/register")
    .post(createOneUser)

router.route("/login")
    .post([checkUserData, handleJWT])

router.route("/users")
    .get(getAllUsers)

router.route("/users/:id")
    .get([authenticateToken, getCurrentUser])
    .put([authenticateToken, updateOneUser])
    .delete([authenticateToken, deleteOneUser])
    
router.route("/users/token")
    .post(regenerateAccessToken)

module.exports = router