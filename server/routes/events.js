const jwt = require('jsonwebtoken')
const {
  JWTSecret
} = require('../constants')
const VolunteerOpportunity = require('../models/Events')
const User = require('../models/User')

module.exports.createEvent = (req, res) => {
  console.log("dddddddddd")
  res.setHeader('Content-Type', 'application/json');
  const name = req.body.name;
  const description = req.body.description;
  const organization = req.body.organization;
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
      if(!user){
        res.send({
          error: "couldn't find user"
        })
        return;
      }
      const doesRequestHaveName = !!name
      const doesRequestHaveDescription = !!description
      const doesRequestHaveOrganization = !!organization

      if (!doesRequestHaveName) {
        res.send({
          error: "Must include event name"
        })
        return;
      }
      if (!doesRequestHaveDescription) {
        res.send({
          error: "Must include event description"
        })
        return;
      }
      if (!doesRequestHaveOrganization) {
        res.send({
          error: "Must include event organization"
        })
        return;
      }

      const newOpportunity = new VolunteerOpportunity({
        name,
        organization,
        description,
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
