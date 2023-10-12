const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: password,
        required: true
    },
    portfolioId: {
        type: [{ type: portfolioSchema }],
        required: true
    }
})

module.exports = mongoose.model("users", userSchema, "users")