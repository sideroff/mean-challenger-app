module.exports = {
    index: (req, res) => {
        res.sendFile(config.rootPath + '/client/views/_layout.html')
    }
}