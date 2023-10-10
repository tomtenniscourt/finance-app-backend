require("dotenv").config() // allows us to load environment variable from .env
const express = require("express") // pulls in express library
const app = express() // creates app variable we can use to configure server
const mongoose = require("mongoose") // pulls in mongoose library we'll use to interface with mongoDB

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) // connect to database, pulled from the var in .env
const db = mongoose.connection
db.on("error", (error) => {console.error(error)}) // on error, console log the error
db.once("open", () => {console.log("connected to database")}) // runs once when connected to db

// middleware - runs after the server receives a request but before it gets passed to routes

// allows us to process requests as JSON
app.use(express.json())

// require the routes from our routes/finance file



// EG: for any url that begins with /user, use the routes in the userRouter



//npm run devStart = start script for server
app.listen(5001, () => {console.log("Server Started Successfully")}) // listen on port 3000, runs when server starts

