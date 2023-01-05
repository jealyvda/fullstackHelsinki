const fs = require('fs')

/**
 * Function which will check if a file exists
 *
 * @param {string} file - The filepath as a string
 * @param {string} callback - The callback function which takes the boolean result
 * @return {void} Nothing
 *
 * @example
 *
 *     exists('myfile.txt', (result) => {
 *          console.log(result)
 *     })
 */
function exists (file, callback) {
    fs.stat(file, function (err) {
        if(err == null) {
            callback(true)
        } else if(err.code === 'ENOENT') {
            callback(false)
        } else {
            callback(false)
        }
    })
}

/**
 * Function which will asynchronously check if a file exists
 *
 * @param {string} file - The filepath as a string
 * @return {Promise<boolean>} A promise which resolves to a boolean
 *
 * @example
 *
 *     const result = await existsAsync('myfile.txt')
 */
function existsAsync (file) {
    return new Promise((resolve, reject) => {
        exists(file, (res) => {
            if (res) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

const enoent = {
    exists,
    existsAsync
}

module.exports = enoent