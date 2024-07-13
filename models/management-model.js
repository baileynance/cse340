const pool = require("../database/")

/* *****************************
*   Add new classifcation
* *************************** */
async function submitClassification(classification_name) {
    try {
      const sql = `INSERT INTO classification (classification_name) VALUES ('${classification_name}');`
      return await pool.query(sql)
    } catch (error) {
      return error.message
    }
}

/* *****************************
*   Add new inventory
* *************************** */
async function submitInventory(inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, inv_color, classification_id) {
    const inv_image = "/images/vehicles/no-image.png";
    const inv_thumbnail = "/images/vehicles/no-image.png";
    try {
      const sql = `INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) 
        VALUES ('${inv_make}', '${inv_model}', '${inv_year}', '${inv_description}', '${inv_image}', '${inv_thumbnail}', '${inv_price}', '${inv_miles}', '${inv_color}', '${classification_id}');`
      return await pool.query(sql)
    } catch (error) {
      return error.message
    }
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInventory(
  inv_id,  
  inv_make,
  inv_model,
  inv_description,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id,
  inv_image = "/images/vehicles/no-image.png",
  inv_thumbnail = "/images/vehicles/no-image.png",
  ) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id
    ])
    console.log(data.rows[0])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

module.exports = { submitClassification, submitInventory, updateInventory }