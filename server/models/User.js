const mongoose = require('mongoose');

module.exports = mongoose.model('User',
  mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String
  })
)
