const mongoose = require('mongoose')

let Schema = mongoose.Schema

let validationMsg = '{PATH} is required'

let challengeSchema = new Schema({
    name: {
        type: String,
        reqired: validationMsg
    },
    urlName: {
        type: String,
        required: validationMsg,
        unique: true
    },
    description: {
        type: String,
        required: validationMsg,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        index: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: validationMsg
    },
    participations: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        active: {
            type: Boolean,
            default: true
        }
    }],
    completedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    views: {
        type: Number,
        default: 0
    }
})

challengeSchema.method({
    renewParticipation: function (participation, callback) {
        participation.active = true
        this.save(callback)
    },
    addParticipation: function (userId, callback) {
        this.participations.push({ user: userId })
        this.save(callback)
    },
    removeParticipation: function (participation, callback) {
        participation.active = false
        this.save(callback)
    },
    completeChallenge: function (userId, callback) {
        let that = this
        that.removeParticipation(userId, function () {
            that.completedBy.push(userId)
            that.save(callback)
        })
    }
})

mongoose.model('Challenge', challengeSchema)