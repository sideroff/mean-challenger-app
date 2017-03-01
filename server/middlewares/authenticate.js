const expressJwt = require('express-jwt')
const jwtSecret = require('../utilities/jwtSecret').getSecret()
const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    let auth = req.headers.authorization

    if (!auth) {
        handleUnauthorizedUsers(req, res, next)
        return
    }
    let data = auth.split(' ')
    if (data.length != 2 || data[0] != 'Bearer') {
        handleUnauthorizedUsers(req, res, next)
        return
    }
    let user = jwt.verify(data[1], jwtSecret)
    if (!user) {
        handleUnauthorizedUsers(req, res, next)
        return
    }
    
    req.user = user

    function handleUnauthorizedUsers(req, res, next) {
        res.send(JSON.stringify({error: 'unautherized'}))
        // req.redirect('/login')
    }
}