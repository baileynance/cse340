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
    res.render("./inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        errors: null
    })
}

module.exports = managementCont