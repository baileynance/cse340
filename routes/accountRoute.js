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
// Process the registration data
router.post("/registration", regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))
// Process the login attempt
router.post("/login", 
    // (req, res) => { res.status(200).send('login process') },
    regValidate.loginRules, 
    utilities.handleErrors(accountController.loginAccount)
)

module.exports = router;