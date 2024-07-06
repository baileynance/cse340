const utilities = require("../utilities/")

const errorCont = {}

errorCont.buildErrorMessage = async function (req, res, next) {
    let nav = await utilities.getNav()
    req.flash(
        "notice",
        `Sorry, please try again`
      )
      res.status(500).render("errors/error", {
        title: "error",
        nav,
    })
}

module.exports = errorCont