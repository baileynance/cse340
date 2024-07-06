const invModel = require("../models/inventory-model")
const makeModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null
  })
}

/* ***************************
 *  Build inventory by inventory id view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.invId;
  const data = await makeModel.getInventoryByInventoryId(inventory_id)
  const grid = await utilities.buildInventoryGrid(data)
  let nav = await utilities.getNav()
  const invYear = data.inv_year;
  const invMake = data.inv_make;
  const invModel = data.inv_model;
  res.render("./inventory/make", {
    title: `${invYear} ${invMake} ${invModel}`,
    nav,
    grid,
    errors: null
  })
}

module.exports = invCont