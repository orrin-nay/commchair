const mongoose = require('mongoose');

module.exports = mongoose.model('Event',
  mongoose.Schema({
    name: String,
    ownerId: String,
    description: String,
    organization: String,
    skills: [String],
  })
)
