module.exports = function (req, res, next) {

    let newChallenge = req.body
    if (!newChallenge.name || !newChallenge.urlName || !newChallenge.description) {
        returnBadRequest(req, res, 'All fields are required!')
        return
    }

    if (newChallenge.name.length < 2 || newChallenge.name.length > 50) {
        returnBadRequest(req, res, 'Name must be between 2 and 50 characters long!')
        return
    }

    if (newChallenge.urlName.length < 2 || newChallenge.urlName.length > 20) {
        returnBadRequest(req, res, 'Url name must be between 2 and 20 characters long!')
        return
    }

    if (!(new RegExp('^[a-z0-9]+(?:-[a-z0-9]+)*$')).test(newChallenge.urlName)) {
        returnBadRequest(req, res, 'Url name must be in format <letters, digits>-<letters, digist>...!')
        return
    }

    next()

    function returnBadRequest(req, res, text) {
        res.setHeader('Content-Type', 'application/json')
        res.status(400)
        res.send(JSON.stringify({ type: 'error', text: text }))
    }
}