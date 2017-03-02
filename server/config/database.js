let mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = (config) => {
    mongoose.connect(config.dbConnectionString)

    let db = mongoose.connection

    db.once('open', err => {
        if (err) {
            console.log(err)
        }

        console.log('MongoDB ready!')
    })

    db.on('error', err => {
        console.log(err)
    })
    
    require('../models/userModel')
    require('../models/challengeModel')
}