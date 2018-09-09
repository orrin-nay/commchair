const express = require('express');
const mongoose = require('mongoose');

const { login, register, profile, addSkill, removeSkill } = require("./user")
const { createEvent, getEvent, getEvents, subscribe } = require("./events")
const { getSkills } = require("./skills")

mongoose.connect("mongodb://commchair:hacktheu2018@ds149672.mlab.com:49672/chaircomm");
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function callback () {
  console.log("Connected to DB");
});

const router = express.Router();

/* GET api listing. */
router.use('/post', (req, res) => {
  res.send('api works');
});

router.use('/user/login', login)
router.use('/user/register', register)
router.use('/user/profile', profile)
router.use('/user/addskill', addSkill)
router.use('/user/removeskill', removeSkill)

router.use('/events/createevent', createEvent)
router.use('/events/getevent', getEvent)
router.use('/events/getevents', getEvents)
router.use('/events/subscribe', subscribe);
router.use('/skills/getskills', getSkills)

module.exports = router;