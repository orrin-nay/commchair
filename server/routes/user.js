const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt')

var User = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
});


const router = express.Router();

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
                jwt.sign({ email: user.email }, 'This is a secret', function(err, token) {
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