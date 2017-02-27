const crypto = require('crypto')


module.exports = {
    generatePasswordHash: function (password, salt, iterations = 10000) {
        salt = salt || generateSalt()
        var hash = crypto.pbkdf2(password, salt, iterations);

        return {
            salt: salt,
            hash: hash,
            iterations: iterations
        }
    }    
}

function generateSalt() {
    let salt = crypto.randomBytes(128).toString('base64')

    return salt
}