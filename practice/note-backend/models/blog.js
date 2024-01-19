const mongoose = require('mongoose')

const schema = mongoose.Schema({
  title: { 
    type: String,
    required: true
  },
  author: { 
    type: String,
    required: true
  },
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', schema)