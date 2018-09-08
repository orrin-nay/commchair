const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String
});