const bcrypt = require('bcrypt')

module.exports = {
    generateHashedPassword: function (password, salt) {
        let hash = bcrypt.hashSync(password, salt)
        
        return hash
    },
    generateSalt: function () {
        let salt = bcrypt.genSaltSync()

        return salt
    }

}