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
            default: []
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
    }]
})

challengeSchema.method({
    addParticipation: function (userId) {
        this.participations.push({userId})
    },
    removeParticipation: function (userId) {
        let participation = this.participations.find(p => {p.user = userId})

        if (participation) {
            participation.active = false
        }
    },
    completeChallenge: function (userId) {
        this.removeParticipation(userId)

        this.completedBy.push(userId)
    }
})

mongoose.model('Challenge', challengeSchema)