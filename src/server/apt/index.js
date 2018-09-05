const fs = require("fs");
const path = require("path");

// This JSON file must be excluded from the repository:
// it contains IDs that should not be exposed.
let JSON_PATH = path.join(__dirname, "production");

if (process.env.NODE_ENV === "test") {
  // The JSON file for unit tests.
  JSON_PATH = path.join(__dirname, "test");
}

const flatten = arrs => arrs.reduce((a, c) => [...a, ...c], []);

const getFromJsons = (dsId, birthdayDateStr) => {
  dsId = parseInt(dsId);
  return new Promise((resolve, reject) => {
    fs.readdir(JSON_PATH, (err, items) => {
      resolve(
        Promise.all(
          items
            .filter(item => item.match(/\.json$/))
            .map(item =>
              getFromJson(dsId, birthdayDateStr, path.join(JSON_PATH, item))
            )
        ).then(flatten)
      );
    });
  });
};

/**
 * Read a JSON file to find the data of an APT (autorisation provisoire de travail)
 * identified by the given demarches-simplifiees's ID and applicant's birthday date.
 *
 * @param {number} dsId The demarches-simplifiees's ID of the APT.
 * @param {string} birthdayDateStr The applicant's birthday date.
 * @returns {Array} An array of 1 matching APT data, or an empty array when there is no result.
 */
function getFromJson(dsId, birthdayDateStr, jsonPath) {
  dsId = parseInt(dsId);
  return new Promise((resolve, reject) => {
    fs.readFile(jsonPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        let jsonData = JSON.parse(data);
        let result = jsonData.filter(
          item =>
            item.ds_id === dsId && item.date_de_naissance === birthdayDateStr
        );
        resolve(result);
      }
    });
  });
}

module.exports = {
  getFromJsons
};
