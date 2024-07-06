// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const managementController = require("../controllers/managementController")

// Route to build inventory by classification view
router.get("/", utilities.handleErrors(managementController.buildManagement));
// Route to build add-classification view
router.get("/add-classification", utilities.handleErrors(managementController.buildAddClassification));
// Route to build add-inventory view
router.get("/add-inventory", utilities.handleErrors(managementController.buildAddInventory));

module.exports = router;