const utilities = require("../utilities/")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ****************************************
*  Deliver login view
* *************************************** */
// View when user logs in
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./account/login", {
    title: "Login",
    nav,
    errors: null
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null
    })
  }

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      errors: null
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors: null
    })
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
   req.flash("notice", "Please check your credentials and try again.")
   res.status(400).render("account/login", {
    title: "Login",
    nav,
    errors: null,
    account_email,
   })
  return
  }
  try {
   if (await bcrypt.compare(account_password, accountData.account_password)) {
   delete accountData.account_password
   const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 })
   if(process.env.NODE_ENV === 'development') {
     res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
     res.cookie("type", accountData.account_type, { httpOnly: true, maxAge: 3600 * 1000 })
     res.cookie("name", accountData.account_firstname, { httpOnly: true, maxAge: 3600 * 1000 })
     res.cookie("id", accountData.account_id, { httpOnly: true, maxAge: 3600 * 1000 })
     } else {
       res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
       res.cookie("type", accountData.account_type, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
       res.cookie("id", accountData.account_id, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
     }
   return res.redirect("/account/")
   } 
   // Added this portion to see if it returns error when info is incorrect
   else {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
     title: "Login",
     nav,
     errors: null,
     account_email,
    })
   }
   // This is where my addition ends
  } catch (error) {
   return new Error('Access Forbidden')
  }
 }

 /* ****************************************
 *  Build acount management view
 * ************************************ */
 async function buildAccountManagement(req, res) {
  let nav = await utilities.getNav()
  req.flash(
    "notice",
    `Congratulations, you're logged in.`
  )
  res.status(201).render("account/management", {
    title: "Account Management",
    nav,
    errors: null
  }) 
}

/* ****************************************
 *  Logout account
 * ************************************ */
async function logoutAccount(req, res) {
  res.clearCookie('jwt'); 
  res.clearCookie('type'); 
  res.clearCookie('name'); 
  res.clearCookie('id'); 
  let nav = await utilities.getNav()
  req.flash(
    "notice",
    `You're logged out.`
  )
  return res.redirect("/")
}

/* ****************************************
*  Deliver update account view
* *************************************** */
async function updateAccountView(req, res, next) {
  let nav = await utilities.getNav()
  const account_id = parseInt(req.params.account_id)
  const accountData = await accountModel.getAccountById(account_id)
  res.render("account/update", {
    title: "Edit Account",
    nav,
    account_firstname: accountData.account_firstname,
    account_lastname: accountData.account_lastname,
    account_email: accountData.account_email,
    account_id,
    errors: null
  })
}

/* ****************************************
*  Update Account Info
* *************************************** */
async function updateAccount(req, res, next) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_id
  } = req.body
  const updateResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  )
  // console.log(updateResult)

  if (updateResult) {
    req.flash("notice", `Your account was successfully updated.`)
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the update has failed.")
    res.status(501).render(`account/update`, {
    title: "Edit Account",
    nav,
    account_firstname,
    account_lastname,
    account_email,
    account_id,
    errors: null
    })
  }
}

/* ****************************************
*  Update Account Password
* *************************************** */
async function updatePassword(req, res, next) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_id,
    account_password
  } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the password change.')
    res.status(500).render("account/update", {
      title: "Edit Account",
      nav,
      account_firstname,
      account_lastname,
      account_email,
      account_id,
      errors: null,
    })
  }
  
  const updateResult = await accountModel.updatePassword(
    hashedPassword,
    account_id
  )
  // console.log(updateResult)

  if (updateResult) {
    req.flash("notice", `Your password was successfully updated.`)
    res.redirect("/account/")
  } else {
    req.flash("notice", "Sorry, the update has failed.")
    res.status(501).render("account/update", {
    title: "Edit Account",
    nav,
    account_firstname,
    account_lastname,
    account_email,
    account_id,
    errors: null
    })
  }
}

module.exports = { buildLogin, buildRegister, registerAccount, accountLogin, buildAccountManagement, logoutAccount, updateAccountView, updateAccount, updatePassword }