const respond = require('../utilities/respond')
let Challenge = require('mongoose').model('Challenge')

module.exports = {
    index: (req, res) => {

    },
    get: (req, res) => {

    },
    create: (req, res) => {
        // challenge validation is handled by a middleware
        let newChallenge = req.body
        newChallenge.author = req.user._id

        Challenge.create(newChallenge).then(
            result => {
                
                respond(res, 200, {type: 'success', text:'Challenge created successfully!', urlName: result.urlName})
            },
            err => {
                if (err.name =='MongoError' && err.code == 11000) {
                    respond(res, 400, {type: 'error', text:'A challenge with such url name already exists!'})
                    return
                }
                respond(res, 500, {type: 'error', text: 'Something went wrong while processing your request.'})
            }
        )

    },
    participate: (req, res) => {

    },
    unParticipate: (req, res) => {

    },
    complete: (req, res) => {

    }
}



