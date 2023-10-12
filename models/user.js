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
    // password: {
        // type: String,
        // required: true
    // },
    // portfolioId: {
        // type: [{ type: portfolioSchema }],
        // required: true
    // }
})

/* mongoose.model(
        Name of the model
        Name of the Schema above
        Name of the collection within the database to be added to.
    )
 */ 
module.exports = mongoose.model("users", userSchema, "users")