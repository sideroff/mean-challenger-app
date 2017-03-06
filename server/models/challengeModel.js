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
    renewParticipation: function(participation, callback) {
        participation.active = true
        this.save(callback)
    },
    addParticipation: function (userId, callback) {
        this.participations.push({ user: userId })
        console.log('adding participation')
        this.save(callback)
    },
    removeParticipation: function (userId, callback) {
        let participation = this.participations.find(p => p.user == userId)

        if (participation) {
            participation.active = false
        }
        this.save(callback)
    },
    completeChallenge: function (userId, callback) {
        this.removeParticipation(userId, function () {
            this.completedBy.push(userId)
            this.save(callback)
        })
    }
})

mongoose.model('Challenge', challengeSchema)