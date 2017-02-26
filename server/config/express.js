module.exports = function(app, config) {

    app.get('/', function (req, res) {
        res.send('Hello from express')
    })

    app.use(express.static(path.join(config.rootPath, 'client')))
}