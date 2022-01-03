const sequelizeManager = require('../../models/sequelize_manager');
const accessTokenManager = require('../../managers/access_token_manager');
const { createHash } = require('crypto');
const roles = require('../../models/roles');
const emailRegex = '.+\\@.+\\..+';

module.exports = {
    handle: function(apiRouter) {
        apiRouter.post('/auth', async function(req, res) {
            const email = req.body.email;
            const password = req.body.password;

            console.log(req.body);
            console.log('email: ' + email);

            if (email.match(emailRegex)) {
                const userByEmail = await sequelizeManager.UserInfo.findOne({
                    where: {
                        email: email
                    }
                });

                if (userByEmail != null) {
                    const passwordHash = createHash('SHA256')
                        .update(password)
                        .digest('hex');

                    console.log('req passwordHash: ' + passwordHash);

                    const userPassword = await sequelizeManager.UserPassword.findOne({
                        where: {
                            userId: userByEmail.userId,
                            passwordHash: passwordHash
                        }
                    });

                    if (userPassword != null) {
                        const user = await sequelizeManager.User.findByPk(userByEmail.id);
                        const accessToken = accessTokenManager.generateKey(user.id, user.role);

                        res.cookie('access_token', accessToken)
                            .json({
                                id: user.id,
                                fullName: user.fullName,
                                email: userByEmail.email
                            }).status(200);
                    } else {
                        res.status(500).json({
                            message: 'Неизвестная ошибка'
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'Пользователь с указанной почтой не был найден'
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Некорректный запрос. Ошибка почты.'
                })
            }
        });

        apiRouter.post('/register', (req, res) => {
           console.log(req.body);

           res.status(201).json({
               message: 'Попытка зарегестрироваться'
           });
        });
    },
}