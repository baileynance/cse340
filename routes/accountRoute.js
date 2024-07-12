// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

// Build By Account
router.get("/login", utilities.handleErrors(accountController.buildLogin));
// Build Registration
router.get("/registration", utilities.handleErrors(accountController.buildRegister));
// Default view
router.get("/", utilities.handleErrors(accountController.buildAccountManagement));
// Process the registration data
router.post("/registration", regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))
// Process the login request
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
)

module.exports = router;