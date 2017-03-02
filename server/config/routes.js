const controllers = require('../controllers')
const authenticate = require('../middlewares/authenticate')
const checkChallengeIntegrity = require('../middlewares/checkChallengeIntegrity')

module.exports = (app, config) => {
    // take only api calls
    app.get('/api/challenges/:pageNumber', controllers.challengeController.index)
    app.get('/api/challenges/:urlName', controllers.challengeController.get)
    app.get('/api/users/check/:username', controllers.usersController.check)

    app.post('/api/login', controllers.usersController.login)
    app.post('/api/register', controllers.usersController.register)
    app.post('/api/challenges', authenticate, checkChallengeIntegrity, controllers.challengeController.create)
    app.post('/api/challenges/participate', authenticate, controllers.challengeController.participate)
    app.post('/api/challenges/un-participate', authenticate, controllers.challengeController.unParticipate)
    app.post('/api/challenges/complete', authenticate, controllers.challengeController.complete)

    // everything else gets sent the index page and angular takes care of the rest
    app.all('/*', controllers.homeController.index);
}