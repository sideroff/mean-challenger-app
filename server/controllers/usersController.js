const jwt = require('jsonwebtoken')
const encryption = require('../utilities/encryption')
const defaultNumberOfIterationsOnHash = 10000
let User = require('mongoose').model('User')

module.exports = {
    register: (req, res) => {
        let salt = encryption.generateSalt()
        encryption.generateHashedPassword(req.body.password, salt, defaultNumberOfIterationsOnHash, function (err, result) {
            if (err) {
                console.log(err)
            }
            console.log(result.toString())
            let newUser = {
                username: req.body.username,
                password: {
                    hash: result,
                    salt: salt,
                    iterations: defaultNumberOfIterationsOnHash
                }
            }
            User.create(newUser, function(err, result) {
                let statusCode = 200 
                let returnJson = {success: 'You have registered successfully!'}
                if(err) {
                    if (err.name == 'MongoError' && err.code == 11000) {
                        statusCode = 409 // conflict
                        returnJson = {error: 'A user with this username already exists'}
                    } 
                    else {
                        statusCode = 500 // internal server error
                        returnJson = {error: err}
                    }                
                }            
                res.setHeader('Content-Type', 'application/json')
                res.status(statusCode)
                res.json(JSON.stringify(returnJson))
            })
        })
        
    },
    login: (req, res) => {
        User.find({username: req.body.username})
        .then((result) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(result));
        })
    }
}