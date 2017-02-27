module.exports = (app, config) => {
     app.get('/', (req, res) => {
        res.sendFile(config.rootPath + '/client/views/_layout.html')
    })
    app.post('/login', (req, res) => {
        console.dir(req.body)
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(req.body));
    })
    app.all('/*', function(req, res, next) {
        res.sendFile(config.rootPath + '/client/views/_layout.html')
    });
}