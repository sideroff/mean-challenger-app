const express = require('express')
const path = require('path')

module.exports = function(app, config) {

    app.get('/', (req, res) => {
        res.sendFile(config.rootPath + '/client/views/_layout.html')
    })
    app.post('/login', (req, res) => {

    })

    app.use(express.static(path.join(config.rootPath, 'client')))
    
    app.all('/*', function(req, res, next) {
        res.sendFile(config.rootPath + '/client/views/_layout.html')
    });
}