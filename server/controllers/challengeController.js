const respond = require('../utilities/respond')
let Challenge = require('mongoose').model('Challenge')

module.exports = {
    index: (req, res) => {
        let page = Number(req.query.page)
        let amount = Number(req.query.amount)

        Challenge.aggregate([
            {$sort: {'dateCreated': -1}},
            {$skip: page > 0 ? ((page - 1) * amount) : 0},
            {$limit: amount}
        ]).then(
            result => {
                respond(res, 200, result)
            },
            err => {
                respond(res, 500, err)
            }
        )
    },
    get: (req, res) => {
        let urlName = req.params.urlName

        Challenge.findOne({urlName: urlName}).then(
            result => {
                if (!result){
                    respond(res, 404, {type: 'error', text: 'No such challenge found :('})
                    return
                }
                respond(res, 200, result)
            },
            err => {
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request.' })
            }
        )
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
                if (err.name == 'MongoError' && err.code == 11000) {
                    respond(res, 400, { type: 'error', text: 'A challenge with such url name already exists!' })
                    return
                }
                respond(res, 500, { type: 'error', text: 'Something went wrong while processing your request.' })
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



