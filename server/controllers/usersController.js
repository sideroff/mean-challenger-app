const jwt = require('jsonwebtoken')
const encryption = require('../utilities/encryption')
const jwtSecret = require('../utilities/jwtSecret').getSecret()
let User = require('mongoose').model('User')

module.exports = {
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

        User.create(newUser, function (err, result) {
            let statusCode = 200
            let returnJson = { success: 'You have registered successfully!' }
            if (err) {
                if (err.name == 'MongoError' && err.code == 11000) {
                    statusCode = 409 // conflict
                    returnJson = { error: 'A user with this username already exists' }
                }
                else {
                    statusCode = 500 // internal server error
                    returnJson = { error: err }
                }
            }
            res.setHeader('Content-Type', 'application/json')
            res.status(statusCode)
            res.json(JSON.stringify(returnJson))
        })
    },
    login: (req, res) => {
        User.findOne({ username: req.body.username })
            .then(user => {
                if (!user || !user.authenticate(req.body.password)) {
                    handleInvalidCredentials(req, res)
                    return
                }

                let payload = {
                    _id: user._id,
                    username: user.username
                }
                let newToken = jwt.sign(payload, jwtSecret)

                res.setHeader('Content-Type', 'application/json')
                res.status(200)
                res.send(JSON.stringify({ success: 'You have successfully logged in!', jwt: newToken, username: user.username }))

            })

    }
}

function handleInvalidCredentials(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.status(401)
    res.send(JSON.stringify({ error: 'Username or password do not match!' }));
}