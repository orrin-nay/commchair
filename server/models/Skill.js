const mongoose = require('mongoose');

module.exports = mongoose.model('Skill',
  mongoose.Schema({
    name: String,
  })
)
