const errorCont = {}

errorCont.buildErrorMessage = async function (req, res, next) {
    res.render("./errors/error", {
        title: "500 Server Error",
        message: "Try Again Please"
    })
}

module.exports = errorCont