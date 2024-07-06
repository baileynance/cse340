// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")

// Build By Account
router.get("/login", utilities.handleErrors(accountController.buildLogin));
// Build Registration
router.get("/registration", utilities.handleErrors(accountController.buildRegister));
// Post Registration Info
router.post('/registration', utilities.handleErrors(accountController.registerAccount));

module.exports = router;