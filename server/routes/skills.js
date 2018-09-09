const Skill = require('../models/Skill')

module.exports.getSkills = (req, res) => {
    Skill.find({}, (err, skills) => {
        res.send(skills)
    })
}