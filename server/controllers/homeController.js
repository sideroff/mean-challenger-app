module.exports = {
    index: (req, res) => {
        res.sendFile(config.rootPath + '/client/views/_layout.html')
    },
    test: (req, res) => {
        res.send('received')
    }

}