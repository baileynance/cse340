const pool = require("../database/")

/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
}

/* *****************************
*   Get account info
* *************************** */
async function getAccount(account_email, account_password){
  try {
    const sql = `SELECT * FROM account WHERE account_email = ${account_email} AND account_password = ${account_password}`
    return await pool.query(sql, [account_email, account_password])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Check for matching password
 * ********************* */
async function checkMatchingPassword(account_email, account_password){
  try {
    const sql = `SELECT * FROM account WHERE account_email = ${account_email}`
    const password = await pool.query(sql, [account_password])
    return password === account_password;
  } catch (error) {
    return error.message
  }
}

module.exports = { registerAccount, checkExistingEmail, checkMatchingPassword, getAccount }