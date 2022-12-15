const User = require('../models/user.models')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {secret} = require ('../config/jwt.config')

module.exports ={

    register: (req, res) => {
        User.create(req.body)
        .then(user =>res.cookie("userToken", jwt.sign({id: user._id}, secret), {httpOnly:true}).json({ msg: "success!", user: user }))
        .catch(err => res.status(400).json(err.errors));
    },

    login: async (req, res) => {
        console.log(req.body.password)
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user == null) {
                    // email not found in users collection
                    res.status(400).json({ msg: "Invalid login attempt!" })
                    res.cookie()
                }
                else {
                    // if we made it this far, we found a user with this email address
                    // let's compare the supplied password to the hashed password in the database
                    bcrypt.compare(req.body.password, user.password)
                        .then(isValid => {

                            if (isValid === true) {
                                // if we made it this far, the password was correct
                                // {httpOnly: true } ensures that the token is only accessible from the server.
                                // res.status(200).cookie("userToken", jwt.sign({ id: user._id }, secret), { httpOnly: true }).json({ msg: "success" });
                                const token = jwt.sign({ id: user._id }, secret);
                                delete user.password;
                                res.status(200).json({ token, user });
                            }
                            else {
                                // password wasn't a match!
                                console.log("password wasn't a match!")
                                res.status(400).json({ msg: "password wasn't a match!" })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json({ msg: "Invalid login attempt!" })
                        })
                }
            })
            .catch(err => res.status(400).json(err.errors));
    },

    logout: (req, res) => {
        res.clearCookie('userToken');
        res.sendStatus(200);
    }

}

