const express = require('express')

let app = express()

let env = process.env.NODE_ENV || 'development'
let config = require(__dirname + '/server/config/config')[env]

require('./server/config/database')(config)
require('./server/config/express')(app, config)
require('./server/config/routes')(app, config)

app.listen(config.port, function () {
    console.log('Server listening on ', config.port)
})