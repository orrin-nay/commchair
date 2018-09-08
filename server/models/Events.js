const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    name: String,
    ownerId: String
});