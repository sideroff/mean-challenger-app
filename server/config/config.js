let path = require('path')

const rootPath = path.join(__dirname,'../../')

let dbUsername = 'challengerUser'
let dbPassword = 'challengerUserPassword'

module.exports = {
    development: {
        port: 3000,
        dbConnectionString: 'mongodb://localhost:27017/challenger-app',
        rootPath: rootPath
    },
    production: {
        port: process.env.PORT,
        dbConnectionString: 'mongodb://' + dbUsername + ':' + dbPassword + '@ds019143.mlab.com:19143/challenger',
        rootPath: rootPath        
    }
}