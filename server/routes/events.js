const jwt = require('jsonwebtoken')
const {
  JWTSecret
} = require('../constants')
const VolunteerOpportunity = require('../models/Events')
const User = require('../models/User')

module.exports.createEvent = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const name = req.body.name;
  const description = req.body.description;
  const organization = req.body.organization;
  const jwtToken = req.body.jwt
  const skills = req.body.skills
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
        ownerId: user.id,
        skills
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
module.exports.subscribe = (req, res) => {
  let subUser = {};
  jwtToken = req.body.jwt;
  eventId = req.body.eventId;
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
      const doesUserExist = !!user
      if(!doesUserExist) {
        res.send({
          error: "User does not exist"
        })
        return
      }
      subUser = user;
    })
    VolunteerOpportunity.findById(eventId, (err, opp) => {
      if (err) {
        console.log(err)
        res.send({
          error: err
        })
        return
      }
      if (opp.subscribers.includes(subUser._id)) {
        console.log("Can't add existent user to database");
        res.send({
          error: "User already subscribed"
        })
        return
      }
      else {
        // opp.subscribers.push(subUser._id);
        // opp.save();
        console.log(opp);
        res.send({
          succes: true
        })
        return
      }
    })
  })
}
