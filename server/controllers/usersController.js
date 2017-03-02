const jwt = require('jsonwebtoken')
const encryption = require('../utilities/encryption')
const jwtSecret = require('../utilities/jwtSecret').getSecret()
const respond = require('../utilities/respond')
let User = require('mongoose').model('User')

module.exports = {
    check: (req, res) => {
        let username = req.params.username
        User.findOne({ username: username }).then(
            result => {
                if (result) {
                    respond(res, 409, {type: 'error', text: 'A user with this username already exists!'})
                }
                else {
                    respond(res, 200, {type: 'info', text: 'This username is free.'})
                }
            },
            err => {
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your requrest!' })
            }
        )
    },
    register: (req, res) => {
        let salt = encryption.generateSalt()
        let passwordHash = encryption.generateHashedPassword(req.body.password, salt)

        let newUser = {
            username: req.body.username,
            password: {
                hash: passwordHash,
                salt: salt
            }
        }

        User.create(newUser).then(
            user => {
                respond(res, 200, { type: 'success', text: 'You have registered successfully!' })
            },
            err => {
                if (err.name == 'MongoError' && err.code == 11000) {
                    respond(res, 409, { type: 'error', text: 'A user with this username already exists' })
                }
                else {
                    respond(res, 500, { type: 'error', text: 'Something went wrong while processing your requrest!' })
                }
            }
        )
    },

    login: (req, res) => {
        User.findOne({ username: req.body.username }).then(
            user => {
                if (!user || !user.authenticate(req.body.password)) {
                    respond(res, 401, { type: 'error', text: 'Username or password do not match!' })
                    return
                }

                let payload = {
                    _id: user._id,
                    username: user.username
                }
                let newToken = jwt.sign(payload, jwtSecret)

                respond(res, 200, { type: 'success', text: 'You have successfully logged in!', jwt: newToken, username: user.username })
            },
            err => {
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your requrest.' })
            })
    }
}