const express = require("express")
// use the router from express
const router = express.Router()
// require the schema


// Getting All
router.get("/", async (req,res) => {

})
// Getting One

router.get("/:id", getSub, (req,res) => {

})

// Creating One
router.post("/", async (req,res) => {

})

// Updating One
router.patch("/", (req,res) => {
    
})
// Deleting One
router.delete("/:id", (req,res) => {
    
})



// export the routes
module.exports = router

