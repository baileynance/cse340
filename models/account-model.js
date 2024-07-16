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
    const sql = `SELECT * FROM account WHERE account_email = $1 AND account_password = $2`
    return await pool.query(sql, [account_email, account_password])
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Get account by email
* *************************** */
async function getAccountByEmail(account_email){
  try {
    const sql = `SELECT * FROM account WHERE account_email = $1`
    const account = await pool.query(sql, [account_email])
    return account.rows[0]
  } catch (error) {
    return error.message
  }
}

/* *****************************
*   Get account by id
* *************************** */
async function getAccountById(account_id){
  try {
    const sql = `SELECT * FROM account WHERE account_id = $1`
    const account = await pool.query(sql, [account_id])
    return account.rows[0]
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

/* ***************************
 *  Update Account Data
 * ************************** */
async function updateAccount(
  account_firstname,
  account_lastname,
  account_email,
  account_id
  ) {
  try {
    const sql =
      "UPDATE public.account SET account_firstname = $1, account_lastname = $2, account_email = $3  WHERE account_id = $4 RETURNING *"
    const data = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_id
    ])
    console.log(data.rows[0])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

/* ***************************
 *  Update Password Data
 * ************************** */
async function updatePassword(
  account_password,
  account_id
  ) {
  try {
    const sql =
      "UPDATE public.account SET account_password = $1 WHERE account_id = $2 RETURNING *"
    const data = await pool.query(sql, [
      account_password,
      account_id
    ])
    console.log(data.rows[0])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

module.exports = { registerAccount, checkExistingEmail, checkMatchingPassword, getAccount, getAccountByEmail, getAccountById, updateAccount, updatePassword }