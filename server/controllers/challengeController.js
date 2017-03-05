const respond = require('../utilities/respond')
let Challenge = require('mongoose').model('Challenge')

module.exports = {
    index: (req, res) => {
        let page = Number(req.query.page)
        let amount = Number(req.query.amount)

        Challenge.aggregate([
            { $sort: { 'dateCreated': -1 } },
            { $skip: page > 0 ? ((page - 1) * amount) : 0 },
            { $limit: amount },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $project: {
                    'name': 1,
                    'urlName': 1,
                    'description': 1,
                    'author.username': 1,
                    'participations': { $size: '$participations' },
                    'completedBy': { $size: '$completedBy' },
                    'dateCreated': 1,
                    'views': 1
                }
            }

        ]).then(
            result => {
                result.forEach(r => r.author = r.author[0].username)
                respond(res, 200, result)
            },
            err => {
                respond(res, 500, err)
            })
    },
    get: (req, res) => {
        let urlName = req.params.urlName

        Challenge.aggregate([
            { $match: { 'urlName': urlName } },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            { $project: { 'name': 1, 'urlName': 1, 'description': 1, 'dateCreated': 1, 'author.username': 1, 'participations': 1, 'completedBy': 1, 'views': 1 } }
        ]).then(
            result => {
                if (!result || result.length == 0) {
                    respond(res, 404, { type: 'error', text: 'No such challenge found :(' })
                    return
                }
                result = result[0]
                result.author = result.author[0].username
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

    },
    unParticipate: (req, res) => {

    },
    complete: (req, res) => {

    }
}



