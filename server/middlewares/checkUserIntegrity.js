const respond = require('../utilities/respond')
const valVars = require('../utilities/validationVariables')

module.exports = function (req, res, next) {

    let newUser = req.body

    if (!newUser.username || !newUser.password || !newUser.confirmPassword) {
        respond(res, 400, { type: 'error', text: 'Username, password and confirm password fields are required!' })
        return
    }

    if (!newUser.password !== newUser.confirmPassword) {
        respond(res, 400, { type: 'error', text: 'Password and confirm password do not match!' })
        return
    }

    if (newUser.username.length < valVars.user.username.min || newUser.username.length > valVars.user.username.max) {
        respond(res, 400, {
            type: 'error', text: 'Username must be between ' + valVars.user.username.min + ' and ' +
            valVars.user.username.max + ' characters long!'
        })
        return
    }

    if (newUser.password.length < valVars.user.password.min || newUser.password.length > valVars.user.password.max) {
        respond(res, 400, {
            type: 'error', text: 'Password must be between ' + valVars.user.password.min + ' and ' +
            valVars.user.password.max + ' characters long!'
        })
        return
    }

    // if (!(new RegExp(valVars.user.email.regex)).test(newUser.email)) {
    //     respond(res, 400, { type: 'error', text: 'Please supply a valid email.' })
    //     return
    // }
    // if (!(new RegExp(valVars.user.username.regex)).test(newUser.username)) {
    //     respond(res, 400, { type: 'error', text: 'Username must contain only letters, digits, hyphens and underscores.' })
    //     return
    // }
    // if (!(new RegExp(valVars.user.password.regex)).test(newUser.password)) {
    //     respond(res, 400, { type: 'error', text: 'Password must contain only letters, digits and special characters.' })
    //     return
    // }

    next()
}