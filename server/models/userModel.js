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
        },
        iterations: {
            type: Number,
            required: validationMsg
        }
    },
    dateRegistered: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.method({
    authenticate: (password) => {
        let inputPasswordHash = encryption.generatePasswordHash(password, this.password.salt, this.password.iterations).hash

        return this.password.hash === inputPasswordHash
    }
})

let User = mongoose.model('User', UserSchema)