const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5
    },
    favoriteGenre: {
        type: String
    }
})

module.exports = mongoose.model('User', schema)