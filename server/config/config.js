let path = require('path')

const rootPath = path.join(__dirname,'../../')

module.exports = {
    development: {
        port: 3000,
        // connection string format: 
        // mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
        dbConnectionString: 'mongodb://localhost:27017/challenger-app',
        rootPath: rootPath,
        secret: 'CHANGE_ME!@#$%'
    },
    production: {
        
    }
}