const express = require('express')
const router = express.Router()
const User = require('../model/User')

//authentication
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

// authentication requests
// if user login is successful, user will be redirected to the homepage
// if authentication fails, user will be redirected back to the login page for another attempt

router.post('/', async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        let loginAttemptInfo = null
        if (err) throw err
        // if no user is defined and user is not found in the database
        if (user == false) {
            loginAttemptInfo = {
                loginAttempt: info.message,
                email: null,
                username: null,
                account_type: null,
                userID: null
            }
        } else {
            loginAttemptInfo = {
                loginAttempt: info.message,
                email: user.email,
                username: user.username,
                account_type: user.account_type,
                userID: user._id
            }
        }
        res.send(loginAttemptInfo)
    })(req, res, next)
})

// uses local stragety to check if username (which is e-mail) and password are valid
passport.use(
    new LocalStrategy(async function (email, password, done) {
        const foundUser = await User.findOne({ email: email })

        // no user found with the specified email address
        if (!foundUser || foundUser === []) {
            return done(null, false, { message: 'User not found' })
        }

        // Compare password hash saved in database with the password provide in the request
        bcrypt.compare(password, foundUser.password, function (err, response) {
            if (err) throw err
            // if password matched, return the user and successful message
            // else:  passwords do not match.  return false, and invalid password message
            if (response === true) {
                return done(null, foundUser, { message: 'Login Successful' })
            } else {
                return done(null, false, { message: 'Invalid password' })
            }
        })
    })
)

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser(function (_id, done) {
    User.findById(_id)
        .then((user) => {
            done(null, {
                _id: _id,
                username: user.username
            })
        })
        .catch((err) => {
            done(err)
        })
})

module.exports = router