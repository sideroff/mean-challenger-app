const crypto = require('crypto')


module.exports = {
    generateHashedPassword: function (password, salt, iterations = 10000, callback) {
        crypto.pbkdf2(password, salt, iterations, 512, 'sha512', callback)        
    },
    generateSalt: function () {
        let salt = crypto.randomBytes(128).toString('base64')

        return salt
    }

}