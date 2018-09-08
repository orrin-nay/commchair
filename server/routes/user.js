const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

var User = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String
});


exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const wasEmailSent = !!email
    const wasPasswordSent = !!password
    if(!wasEmailSent || !wasPasswordSent){
        res.send({error: 'Please include and email and a password'})
        return
    }
    User.findOne({email: email}, (err, user) => {
        if(err){
            console.log(err)
            res.send({error: err})
            return
        }
        const doesUserExist = !!user
        if(!doesUserExist){
            res.send({error: "User Not Found"})
            return
        }

        const hashedPassword = user.password
        bcrypt.compare(password, hashedPassword, function(err, passwordsMatch) {
            if(err){
                console.log(err)
                res.send({error: err})
                return
            }
            if(passwordsMatch){
                makeJWT(user.email, function(err, token) {
                    if(err){
                        console.log(err)
                        res.send({error: err})
                        return
                    }
                    res.send({ token })
                });
            }
        });
    })
}

exports.register = (req, res) => {
    const firstName = req.body.password
    const lastName = req.body.password
    const email = req.body.email
    const phone = req.body.password
    const password = req.body.password

    const wasFirstNameSent = !!firstName
    const wasLastNameSent = !!lastName
    const wasEmailSent = !!email
    const wasPhoneSent = !!phone
    const wasPasswordSent = !!password
    
    if(!wasFirstNameSent || !wasLastNameSent || !wasEmailSent
        || !wasPhoneSent || !wasPasswordSent){
        res.send({error: 'Please include an firstName, lastName, email, phone, and a password'})
        return
    }
    User.findOne({email: email}, (err, user) => {
        if(err){
            console.log(err)
            res.send({error: err})
            return
        }
        const doesUserExist = !!user
        if(doesUserExist){
            res.send({error: "User Already Exist"})
            return
        }
        bcrypt.genSalt(10, function(err, salt) {
            if(err){
                console.log(err)
                res.send({error: err})
                return
            }
            bcrypt.hash(password, salt, function(err, hashedPassword) {
                if(err){
                    console.log(err)
                    res.send({error: err})
                    return
                }
                const newUser = User({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password: hashedPassword
                })
                newUser.save();
                makeJWT(email, function(err, token) {
                    if(err){
                        console.log(err)
                        res.send({error: err})
                        return
                    }
                    res.send({ token })
                });
            });
        });
    })
}

const makeJWT = (email, callback) =>{
    jwt.sign({ email: email }, 'This is a secret', function(err, token) {
        if(err){
            callback(err)
        }
        callback(undefined, token)
    });
}