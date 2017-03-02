
module.exports = function (res, statusCode, respondObj) {
    res.setHeader('Content-Type', 'application/json')
    res.status(statusCode)
    res.send(JSON.stringify(respondObj))
}