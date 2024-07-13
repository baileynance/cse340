const managementModel = require("../models/management-model")
const utilities = require("../utilities/")
const invModel = require("../models/inventory-model")

const managementCont = {}

/* ***************************
 *  Build management view
 * ************************** */
managementCont.buildManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    const select = await utilities.buildClassificationList()
    res.render("./inventory/management", {
        title: "Manage",
        nav,
        select,
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

/* ***************************
 *  Build edit inventory view
 * ************************** */
managementCont.editInventory = async function (req, res, next) {
  const inv_id = parseInt(req.params.inventory_id)
  console.log(inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByInventoryId(inv_id)
  const select = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    select: select,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

module.exports = managementCont