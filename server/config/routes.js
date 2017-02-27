const controllers = require('../controllers')

module.exports = (app, config) => {
     app.get('/', controllers.homeController.index)

    app.post('/login', controllers.usersController.login)
    app.post('/register', controllers.usersController.register)

    app.all('/*', controllers.homeController.index);
}