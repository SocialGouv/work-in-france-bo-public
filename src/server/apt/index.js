const fs = require('fs')
const path = require('path')


// This JSON file must be excluded from the repository:
// it contains IDs that should not be exposed.
let JSON_DATA = path.join(__dirname, 'validity_check.json')

if (process.env.NODE_ENV === 'test') {
  // The JSON file for unit tests.
  JSON_DATA = path.join(__dirname, 'validity_check_test.json')
}


/**
 * Read a JSON file to find the data of an APT (autorisation provisoire de travail)
 * identified by the given demarches-simplifiees's ID and applicant's birthday date.
 *
 * @param {number} dsId The demarches-simplifiees's ID of the APT.
 * @param {string} birthdayDateStr The applicant's birthday date.
 * @returns {Array} An array of 1 matching APT data, or an empty array when there is no result.
 */
function getFromJson (dsId, birthdayDateStr) {
  dsId = parseInt(dsId)
  return new Promise(function (resolve, reject) {
    fs.readFile(JSON_DATA, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        let jsonData = JSON.parse(data)
        let result = jsonData.filter(
          function (item) {
            return item.ds_id === dsId && item.date_de_naissance === birthdayDateStr
          }
        )
        resolve(result)
      }
    })
  })
}

module.exports = {
  getFromJson,
}
