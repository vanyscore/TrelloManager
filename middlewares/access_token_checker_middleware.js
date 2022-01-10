const tokenManager = require('../managers/access_token_manager');
const sequelizeManager = require('../models/sequelize_manager');

module.exports = async function(req, res, next) {
    req.user = null;

    if (req.cookies !== undefined) {
        const accessToken = req.cookies['access_token'];

        console.log('access_token: ' + accessToken);

        if (accessToken != null) {
            const payload = tokenManager.parsePayload(accessToken);

            if (payload != null) {
                const userId = payload.id;

                req.user = await sequelizeManager.User.findByPk(userId);
                console.log('attached user by token:');
                console.log({
                    id: req.user.id,
                    role: req.user.role
                });
            }
        }
    }

    next();
}