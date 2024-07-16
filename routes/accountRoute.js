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
router.get("/", 
    utilities.checkLogin, 
    utilities.checkUserDisplay, 
    utilities.handleErrors(accountController.buildAccountManagement));
// Process the registration data
router.post("/registration", regValidate.registationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerAccount))
// Process the login request
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
)
// Logout account
router.get("/logout", utilities.handleErrors(accountController.logoutAccount));
// Update account
router.get("/update/:account_id", utilities.handleErrors(accountController.updateAccountView));
// Process update request
router.post(
    "/update-account",
    regValidate.accountUpdateRules(),
    regValidate.checkAccountUpdateData,
    utilities.handleErrors(accountController.updateAccount)
)
// Process update request
router.post(
    "/update-password",
    regValidate.passwordUpdateRules(),
    regValidate.checkPasswordUpdateData,
    utilities.handleErrors(accountController.updatePassword)
)

module.exports = router;