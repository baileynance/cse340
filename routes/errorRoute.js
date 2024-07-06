// Needed Resources 
const express = require("express")
const router = new express.Router() 
const errorController = require("../controllers/errorController")
const utilities = require("../utilities/index")

router.get("/", utilities.handleErrors(errorController.buildErrorMessage));

module.exports = router;