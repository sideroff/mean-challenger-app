const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')


module.exports = function (app, config) {
    let publicStaticFilesPath = path.join(config.rootPath, 'client')
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())    

    app.use(express.static(publicStaticFilesPath))
}