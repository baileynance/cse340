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

module.exports = { submitClassification, submitInventory }