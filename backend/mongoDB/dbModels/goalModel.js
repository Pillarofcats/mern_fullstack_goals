const mongoose = require('mongoose')

//Structure of data for goal DB documents
const goalSchema = mongoose.Schema({
  //user references the userModel schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  text: {
    type: String,
    required: [true, 'Please add text value']
  }
}, {timestamps: true})

module.exports = mongoose.model('Goal', goalSchema)