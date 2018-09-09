const Skill = require('../models/Skill')

module.exports.getSkills = (req, res) => {
    Skill.find( (skills) => {
        res.send(skills)
    })
}