const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')


module.exports = function(app, config) {
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use(express.static(path.join(config.rootPath, 'client')))

}