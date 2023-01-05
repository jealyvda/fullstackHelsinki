const { exists, existsAsync } = require('./main') // Import exists function from enoent

exists('LICENSE', (result) => {
    console.log('LICENSE', result)
})

exists('RANDOMFILE.txt', (result) => {
    console.log('RANDOMFILE.txt', result)
})

// Promisified version
;(async function () {
    const result = await existsAsync('package.json')
    console.log('package.json', result)
})()