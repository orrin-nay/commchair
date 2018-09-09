const bcrypt = require('bcrypt')
const {
  JWTSecret,
  bcryptSalts
} = require('../constants')
const User = require('../models/User')
const Skill = require('../models/Skill')
const jwt = require('jsonwebtoken')


exports.login = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const wasEmailSent = !!email
  const wasPasswordSent = !!password
  if (!wasEmailSent || !wasPasswordSent) {
    res.send({
      error: 'Please include and email and a password'
    })
    return
  }
  User.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      console.log(err)
      res.send({
        error: err
      })
      return
    }
    const doesUserExist = !!user
    if (!doesUserExist) {
      res.send({
        error: "User Not Found"
      })
      return
    }

    const hashedPassword = user.password
    bcrypt.compare(password, hashedPassword, function (err, passwordsMatch) {
      if (err) {
        console.log(err)
        res.send({
          error: err
        })
        return
      }
      console.log(passwordsMatch)
      if (passwordsMatch) {
        makeJWT(user.email, function (err, token) {
          if (err) {
            console.log(err)
            res.send({
              error: err
            })
            return
          }
          res.send({
            token
          })
        });
      } else {
        res.send({
          error: 'User Not Found'
        })
        return
      }
    });
  })
}

exports.register = (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const phone = req.body.phone
  const password = req.body.password

  const wasFirstNameSent = !!firstName
  const wasLastNameSent = !!lastName
  const wasEmailSent = !!email
  const wasPhoneSent = !!phone
  const wasPasswordSent = !!password

  if (!wasFirstNameSent || !wasLastNameSent || !wasEmailSent ||
    !wasPhoneSent || !wasPasswordSent) {
    res.send({
      error: 'Please include an firstName, lastName, email, phone, and a password'
    })
    return
  }
  User.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      console.log(err)
      res.send({
        error: err
      })
      return
    }
    const doesUserExist = !!user
    if (doesUserExist) {
      res.send({
        error: "User Already Exist"
      })
      return
    }
    bcrypt.genSalt(bcryptSalts, function (err, salt) {
      if (err) {
        console.log(err)
        res.send({
          error: err
        })
        return
      }
      bcrypt.hash(password, salt, function (err, hashedPassword) {
        if (err) {
          console.log(err)
          res.send({
            error: err
          })
          return
        }
        const newUser = new User({
          firstName,
          lastName,
          email,
          phone,
          password: hashedPassword
        })
        newUser.save((err) => {
          if (err) {
            console.log(err)
            res.send({
              error: err
            })
            return
          }
          makeJWT(email, function (err, token) {
            if (err) {
              console.log(err)
              res.send({
                error: err
              })
              return
            }
            res.send({
              token
            })
          });
        });
      });
    });
  })
}

module.exports.profile = (req, res) => {
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
      const doesUserExist = !!user
      if (!doesUserExist) {
        res.send({
          error: "Issue"
        })
        return
      }
      user.password = undefined;
      const skills = []
      if (user.skills) {
        user.skills.forEach(
          skill => skills.push(
            new Promise((resolve) =>{
            Skill.findById(skill).then(newSkill => {
              resolve(newSkill)
            })
          }))
        );
      }
      Promise.all(skills).then(function (skillsFromDb) {
        const newUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          skills: skillsFromDb,
        }
        res.send(newUser)
      })
    })
  })
}

module.exports.addSkill = (req, res) => {
  const jwtToken = req.body.jwt
  const skill = req.body.skill

  if (!skill) {
    res.send({
      error: "Must include a skill"
    })
    return
  }
  Skill.findById(skill, (err, skill) => {
    if (err) {
      console.log(err)
      res.send({
        error: err
      })
      return
    }
    if (!skill) {
      res.send({
        error: "invalid skill"
      })
      return
    }
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
        if (!doesUserExist) {
          res.send({
            error: "Issue"
          })
          return
        }
        if (!user.skills) {
          user.skills = []
        }
        const shouldCancel = false
        user.skills.forEach(userSkill => {
          if(userSkill === user.id){
            res.send({
              error: "User already has skill"
            })
            shouldCancel = true
            return
          }
        });
        if(shouldCancel){
          return
        }
        user.skills.push(skill.id)
        user.save((user) => {
          res.send({success: true})
        })
      })
    })
  })
}
module.exports.removeSkill = (req, res) => {
  const jwtToken = req.body.jwt
  const skill = req.body.skill
  if (!skill) {
    res.send({
      error: "Must include a skill"
    })
    return
  }
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
      if (!doesUserExist) {
        res.send({
          error: "Issue"
        })
        return
      }
      const index = user.skills.findIndex((o) => o === skill);
      if (index === -1) {
        res.send({
          error: "Invalid Skill"
        })
        return
      }
      user.skills.splice(index, 1);
      user.save()
      res.send({
        success: true
      })
    })
  })
}
const makeJWT = (email, callback) => {
  jwt.sign({
    email: email
  }, JWTSecret, function (err, token) {
    if (err) {
      callback(err)
    }
    callback(undefined, token)
  });
}
