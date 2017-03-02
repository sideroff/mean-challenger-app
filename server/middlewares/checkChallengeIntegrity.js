const respond = require('../utilities/respond')

module.exports = function (req, res, next) {

    let newChallenge = req.body
    
    if (!newChallenge.name || !newChallenge.urlName || !newChallenge.description) {
        respond(res, 400, {type: 'error', text: 'All fields are required!'})
        return
    }

    if (newChallenge.name.length < 2 || newChallenge.name.length > 50) {
        respond(res, 400, {type: 'error', text: 'Name must be between 2 and 50 characters long!'})
        return
    }

    if (newChallenge.urlName.length < 2 || newChallenge.urlName.length > 20) {
        respond(res, 400, {type: 'error', text: 'Url name must be between 2 and 20 characters long!'})
        return
    }

    if (!(new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*$')).test(newChallenge.urlName)) {
        respond(res, 400, {type: 'error', text: 'Url name must be in format <letters, digits>-<letters, digist>...!'})
        return
    }

    next()
}