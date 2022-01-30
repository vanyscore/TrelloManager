const authController = require('./api/auth_controller')
const exampleController = require('./api/example_controller')
const usersController = require('./api/users_controller')
const cardsController = require('./api/cards_controller')

module.exports = {
    authController: authController,
    exampleController: exampleController,
    usersController: usersController,
    cardsController: cardsController,

    handle: function(apiRouter) {
        authController.handle(apiRouter)
        exampleController.handle(apiRouter)
        usersController.handle(apiRouter)
        cardsController.handle(apiRouter)
    }
}