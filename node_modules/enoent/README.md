# enoent
 Simple Module which replaces fs.exists

# Import
```js
const { exists, existsAsync } = require('enoent')
```

# Usage
```js
// Callback
exists('RANDOMFILE.txt', (result) => {
    console.log('RANDOMFILE.txt', result)
})

// Promisified
const result = await existsAsync('RANDOMFILE.txt')
console.log('RANDOMFILE.txt', result)
```

# Replacing the fs function
Put this where you normally would import fs
```js
const fs = require('fs')
fs.exists = require('enoent').exists
```

And you can use
```js
fs.exists('myfile.txt', (result) => {
    console.log(result)
})
```