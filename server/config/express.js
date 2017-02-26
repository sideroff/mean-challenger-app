const express = require('express')
const path = require('path')

module.exports = function(app, config) {

    app.get('/', function (req, res) {
        res.sendFile(config.rootPath + '/client/views/_layout.html')
    })

    app.use(express.static(path.join(config.rootPath, 'client')))
}