const path = require('path')

module.exports = {
    index: (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/views/_layout.html'))
    },
    test: (req, res) => {
        res.send('received')
    }

}