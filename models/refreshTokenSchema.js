const mongoose = require("mongoose")

const refreshTokenSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model("refreshTokenSchema", refreshTokenSchema, "refreshToken")