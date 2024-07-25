// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const invController = require("../controllers/invController")
const managementController = require("../controllers/managementController")
const regValidate = require('../utilities/management-validation')

// 
// Discovery
//
// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
// Route to build inventory by inventory id view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));

// 
// Management
//
// Route to build inventory by classification view
router.get("/", utilities.checkAuthorized, utilities.handleErrors(managementController.buildManagement));
// Route to build add-classification view
router.get("/add-classification", utilities.checkAuthorized, utilities.handleErrors(managementController.buildAddClassification));
// Route to build add-inventory view
router.get("/add-inventory", utilities.checkAuthorized, utilities.handleErrors(managementController.buildAddInventory));
// Process the adding classifcation data
router.post("/add-classification", regValidate.classificationRules(), regValidate.checkClassData, utilities.checkAuthorized, utilities.handleErrors(managementController.addClassification))
// Process the adding inventory data
router.post("/add-inventory", 
    regValidate.inventoryRules(), 
    regValidate.checkInventoryData, 
    utilities.checkAuthorized,
    utilities.handleErrors(managementController.addInventory)
)
// Route to get inventory by classification id
router.get("/getInventory/:classification_id", utilities.checkAuthorized, utilities.handleErrors(invController.getInventoryJSON))

// Route to edit inventory by inventory id
router.get("/edit/:inventory_id", utilities.checkAuthorized, utilities.handleErrors(managementController.editInventoryView))
router.post("/update", 
    regValidate.inventoryRules(), 
    regValidate.checkUpdateData,
    utilities.checkAuthorized,
    utilities.handleErrors(managementController.updateInventory)
)

// Route to delete inventory view
router.get("/delete/:inventory_id", utilities.checkAuthorized, utilities.handleErrors(managementController.deleteInventoryView))
// Route to delete inventory by inventory id
router.post("/delete", 
    regValidate.deleteRules(), 
    regValidate.checkDeleteData,
    utilities.checkAuthorized,
    utilities.handleErrors(managementController.deleteInventory)
)

// Route to notification signup route
// router.get("/notify:inventory_id", utilities.handleErrors(managementController.notifyInventoryView))
// router.post("/notify", 
//     regValidate.notifyRules(), 
//     regValidate.checkNotifyData,
//     utilities.handleErrors(managementController.notifyInventory)
// )

module.exports = router;