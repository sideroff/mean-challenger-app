const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const jwtSecret = require('../utilities/jwtSecret').getSecret()


module.exports = function (app, config) {

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    // require authorization unless on ...
    app.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/', '/login', '/register'] }))

    // handle unauthorized users
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send(JSON.stringify({error: 'You need to be logged in first!'}))
        }
    })

    app.use(express.static(path.join(config.rootPath, 'client')))

}