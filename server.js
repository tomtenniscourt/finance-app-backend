require("dotenv").config() // allows us to load environment variable from .env
const express = require("express") // pulls in express library
const app = express() // creates app variable we can use to configure server
const mongoose = require("mongoose") // pulls in mongoose library we'll use to interface with mongoDB
const cors = require("cors");

// bgSjsanaPQCnyMMq
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) // connect to database, pulled from the var in .env
const db = mongoose.connection
db.on("error", (error) => {console.error(error)}) // on error, console log the error
db.once("open", () => {console.log("connected to database")}) // runs once when connected to db

// middleware - runs after the server receives a request but before it gets passed to routes

app.use(
    cors({
      origin:  ["http://localhost:3000", "https://finance-app-black.vercel.app"],
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    })
  );
  

// allows us to process requests as JSON
app.use(express.json())

// require the routes from our routes/finance file
const userRouter = require("./routes/users")

// EG: for any url that begins with /user, use the routes in the userRouter
app.use("/users", userRouter)

//npm run start = start script for server
const port = process.env.PORT || 5001;
app.listen(port, () => {console.log("Server Started Successfully")}) // listen on port, runs when server starts

console.log('Working')