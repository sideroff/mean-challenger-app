const respond = require('../utilities/respond')
let Challenge = require('mongoose').model('Challenge')

module.exports = {
    index: (req, res) => {
        let page = Number(req.query.page)
        let amount = Number(req.query.amount)

        Challenge.find()
        .sort({ dateCreated: 1})
        .skip(page > 0 ? ((page - 1) * amount) : 0 )
        .limit(amount ? amount : 0)
        .populate({path: 'author', select: 'username'})
        .populate({path: 'participations.user', select: 'username'})
        .populate({path: 'completedBy', select: 'username'})
        .then(
            result => {
                respond(res, 200, result)
            },
            err => {
                respond(res, 500, err)
            })
    },
    get: (req, res) => {
        let urlName = req.params.urlName
        // fml
        Challenge.find()
        .where({urlName: urlName})
        .populate({path: 'author', select: 'username'})
        .populate({path: 'participations.user', select: 'username'})
        .populate({path: 'completedBy', select: 'username'})
        .then(
            result => {
                if (!result || result.length == 0) {
                    respond(res, 404, { type: 'error', text: 'No such challenge found :(' })
                    return
                }
                result = result[0]
                Challenge.update({ urlName: result.urlName }, { $inc: { 'views': 1 } }).then(
                    r => {
                        respond(res, 200, result)
                    },
                    e => {
                        console.log(err)
                        respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request.' })
                    }
                )
            },
            err => {
                console.log(err)
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request.' })
            })
    },
    create: (req, res) => {
        // challenge validation is handled by a middleware
        let newChallenge = req.body
        newChallenge.author = req.user._id

        Challenge.create(newChallenge).then(
            result => {
                respond(res, 200, { type: 'success', text: 'Challenge created successfully!', urlName: result.urlName })
            },
            err => {
                console.log(err)
                if (err.name == 'MongoError' && err.code == 11000) {
                    respond(res, 400, { type: 'error', text: 'A challenge with such url name already exists!' })
                    return
                }
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request.' })
            }
        )

    },
    participate: (req, res) => {
        let urlName = req.params.urlName
        Challenge.findOne({ 'urlName': urlName }).then(
            result => {

                
                if (checkIfAlreadyCompleted(result, req.user._id)) {
                    respond(res, 409, { type: 'error', text: 'You have already completed this challenge!' })
                    return
                }

                let participation = result.participations.find(p => p.user == req.user._id)

                // no participation => add
                if (!participation) {
                    result.addParticipation(req.user._id, function (err, result) {
                        if (err) {
                            respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request!' })
                            return
                        }
                        respond(res, 200, { type: 'success', text: 'You have successfully participated!' })
                        return
                    })
                    return
                }
                // have participated before => if its active: err, renew if its been canceled
                if (participation.active) {
                    respond(res, 400, { type: 'error', text: 'You have already participated to this challenge' })
                    return
                }
                result.renewParticipation(participation, function (err, result) {
                    if (err) {
                        respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request!' })
                        return
                    }
                    respond(res, 200, { type: 'success', text: 'You have successfully participated!' })
                })
            },
            err => {
                console.log(err)
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request!' })
            }
        )
    },
    unParticipate: (req, res) => {
        let urlName = req.params.urlName
        Challenge.findOne({ urlName: urlName }).then(
            result => {

                if (checkIfAlreadyCompleted(result, req.user._id)) {
                    respond(res, 409, { type: 'error', text: 'You have already completed this challenge!' })
                    return
                }

                let participation = result.participations.find(p => p.user == req.user._id)
                if (!participation || !participation.active) {
                    respond(res, 500, { type: 'error', text: 'You must participate to this challenge first!' })
                    return
                }
                result.removeParticipation(participation, function (err, result) {
                    if (err) {
                        respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request!' })
                        return
                    }
                    respond(res, 200, { type: 'success', text: 'You have successfully unparticipated from this challenge!' })
                })
            },
            err => {
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request!' })
            }
        )
    },
    complete: (req, res) => {
        let urlName = req.params.urlName
        Challenge.findOne({ urlName: urlName }).then(
            result => {
                if (!result) {
                    respond(res, 404, { type: 'error', text: 'No challenge with such name found' })
                    return
                }

                if (checkIfAlreadyCompleted(result, req.user._id)) {
                    respond(res, 409, { type: 'error', text: 'You have already completed this challenge!' })
                    return
                }

                let participation = result.participations.find(p => p.user == req.user._id)
                if (!participation || !participation.active) {
                    respond(res, 409, { type: 'error', text: 'You must participate to this challenge first!' })
                    return
                }
                result.removeParticipation(participation, function (err, rs) {
                    if (err) {
                        respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request!' })
                        return
                    }
                    console.log(result)
                    result.completeChallenge(req.user._id, function (err, rss) {
                        if (err) {
                            respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request!' })
                            return
                        }
                        respond(res, 200, { type: 'success', text: 'You have successfully completed this challenge!' })
                    })
                })
            },
            err => {
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request!' })
            }
        )
    }
}

function checkIfAlreadyCompleted(challenge, userId) {

    let alreadyCompleted = challenge.completedBy.find(c => c == userId)
    return alreadyCompleted
    
}


