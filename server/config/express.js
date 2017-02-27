const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')


module.exports = function(app, config) {

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(expressJwt({ secret: config.secret}).unless({ path: ['/', '/login', '/register']}))
    
    app.use(express.static(path.join(config.rootPath, 'client')))

}