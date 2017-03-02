const respond = require('../utilities/respond')
const valVars = require('../utilities/validationVariables')

module.exports = function (req, res, next) {

    let newChallenge = req.body

    if (!newChallenge.name || !newChallenge.urlName || !newChallenge.description) {
        respond(res, 400, { type: 'error', text: 'Name, urlName and description fields are required!' })
        return
    }

    if (newChallenge.name.length < valVars.challenge.name.min || newChallenge.name.length > valVars.challenge.name.max) {
        respond(res, 400, { type: 'error', text: 'Name must be between 2 and 50 characters long!' })
        return
    }


    if (newChallenge.urlName.length < valVars.challenge.urlName.min || newChallenge.urlName.length > valVars.challenge.urlName.max) {
        respond(res, 400, { type: 'error', text: 'Url name must be between 2 and 20 characters long!' })
        return
    }


    // if (!(new RegExp(valVars.challenge.name.regex)).test(newChallenge.name)) {
    //     respond(res, 400, { type: 'error', text: 'How did you get this error?' })
    //     return
    // }

    // if (!(new RegExp(valVars.challenge.urlName.regex)).test(newChallenge.urlName)) {
    //     respond(res, 400, { type: 'error', text: 'Url name must be in format <letters, digits>-<letters, digist>...!' })
    //     return
    // }

    next()
}