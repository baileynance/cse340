const managementModel = require("../models/management-model")
const utilities = require("../utilities/")

const managementCont = {}

/* ***************************
 *  Build management view
 * ************************** */
managementCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Manage",
        nav,
        errors: null
    })
}

/* ***************************
 *  Build add-classifcation view
 * ************************** */
managementCont.buildAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null
    })
}

/* ***************************
 *  Build add-inventory view
 * ************************** */
managementCont.buildAddInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    let select = await utilities.buildClassificationList();
    res.render("./inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        select,
        errors: null
    })
}

/* ****************************************
*  Process Adding Classification
* *************************************** */
managementCont.addClassification = async function (req, res) {
    let nav = await utilities.getNav()
    const { classification_name } = req.body
  
    const regResult = await managementModel.submitClassification(
      classification_name
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations! ${classification_name} has been added.`
      )
      res.status(201).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null
      })
    } else {
      req.flash("notice", "Sorry, attempt failed.")
      res.status(501).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: null
      })
    }
}

/* ****************************************
*  Process Adding Inventory
* *************************************** */
managementCont.addInventory = async function (req, res) {
    let nav = await utilities.getNav()
    let select = await utilities.buildClassificationList();
    const { inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id } = req.body
  
    const regResult = await managementModel.submitInventory(
        inv_make, 
        inv_model, 
        inv_year, 
        inv_description, 
        inv_price, 
        inv_miles, 
        inv_color, 
        classification_id
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations! Inventory has been added.`
      )
      res.status(201).render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        select,
        errors: null
      })
    } else {
      req.flash("notice", "Sorry, attempt failed.")
      res.status(501).render("inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        select,
        errors: null
      })
    }
}

module.exports = managementCont