// Needed Resources 
const express = require("express")
const router = new express.Router() 
const errorController = require("../controllers/errorController")

router.get("/", errorController.buildErrorMessage);

module.exports = router;