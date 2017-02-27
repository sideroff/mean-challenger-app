const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const validationMsg = "{PATH} is required"
let Schema = mongoose.Schema

let UserSchema = new Schema({
    username: {
        type: String,
        required: validationMsg,
        unique: true
    },
    password: {
        hash: {
            type: String,
            required: validationMsg
        },
        salt: {
            type: String,
            required: validationMsg
        }
    },
    dateRegistered: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.method({
    authenticate: function (password) {
        return this.password.hash === encryption.generateHashedPassword(password, this.password.salt)
    }
})


let User = mongoose.model('User', UserSchema)