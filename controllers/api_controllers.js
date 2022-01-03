const authController = require('./api/auth_controller');
const exampleController = require('./api/example_controller');

module.exports = {
    authController: authController,
    exampleController: exampleController,

    handle: function(apiRouter) {
        authController.handle(apiRouter);
        exampleController.handle(apiRouter);
    }
}