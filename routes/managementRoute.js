// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const managementController = require("../controllers/managementController")
const regValidate = require('../utilities/management-validation')

// Route to build inventory by classification view
router.get("/", utilities.handleErrors(managementController.buildManagement));
// Route to build add-classification view
router.get("/add-classification", utilities.handleErrors(managementController.buildAddClassification));
// Route to build add-inventory view
router.get("/add-inventory", utilities.handleErrors(managementController.buildAddInventory));
// Process the adding classifcation data
router.post("/add-classification", regValidate.classificationRules(), regValidate.checkClassData, utilities.handleErrors(managementController.addClassification))
// Process the adding inventory data
router.post("/add-inventory", 
    regValidate.inventoryRules(), 
    regValidate.checkInventoryData, 
    utilities.handleErrors(managementController.addInventory))

module.exports = router;