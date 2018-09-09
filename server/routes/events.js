const jwt = require('jsonwebtoken')
const {
  JWTSecret
} = require('../constants')
const VolunteerOpportunity = require('../models/Events')
const User = require('../models/User')

module.exports.createEvent = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const name = req.body.name;
  const jwtToken = req.body.jwt
  jwt.verify(jwtToken, JWTSecret, function (err, userInfo) {
    if (err) {
      console.log(err)
      res.send({
        error: err
      })
      return
    }

    User.findOne({
      email: userInfo.email
    }, (err, user) => {
    if (err) {
        console.log(err)
        res.send({
            error: err
        })
        return
    }
      const doesRequestHaveName = !!name

      if (!doesRequestHaveName) {
        res.send({
          error: "Must include event name"
        })
      }

      const newOpportunity = new VolunteerOpportunity({
        name,
        ownerId: user.id
      })
      newOpportunity.save()
      res.send({
        success: true
      })
    })
  });
}

module.exports.getEvents = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  VolunteerOpportunity.find({}, function (err, opps) {
    if (err) {
      console.log(err)
      res.send({
        error: err
      })
      return
    }
    res.send(JSON.stringify(opps))
  })
}
