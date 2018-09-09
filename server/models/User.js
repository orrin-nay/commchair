const mongoose = require('mongoose');

module.exports = mongoose.model('User',
  mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    ratings: [{rating:Number, comment:String, userId:String}],
    skills: [String],
    password: String,
  })
)
