const sequelizeManager = require('../../models/sequelize_manager');
const accessTokenManager = require('../../managers/access_token_manager');
const { createHash } = require('crypto');
const roles = require('../../models/roles');
const emailRegex = '.+\\@.+\\..+';
const passwordRegex = '^(\\S){8,}$';

module.exports = {
    handle: function(apiRouter) {
        apiRouter.post('/auth', async function(req, res) {
            try {
                console.log('/auth body:');
                console.log(req.body);

                const email = req.body['email'];
                const password = req.body['password'];

                if (email == null || password == null) {
                    res.status(400).json({
                        message: 'Требуется логин и пароль'
                    })
                }

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

                        const userPassword = await sequelizeManager.UserPassword.findOne({
                            where: {
                                userId: userByEmail.userId,
                                passwordHash: passwordHash
                            }
                        });

                        if (userPassword != null) {
                            const user = await sequelizeManager.User.findByPk(userByEmail.id);
                            const accessToken = accessTokenManager.generateKey({
                                id: user.id,
                                role: user.role
                            });

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
            } catch (ex) {
                res.status(500);
            }
        });

        apiRouter.post('/register/:invite_token?', async function (req, res) {
           try {
               console.log('/register body:');
               console.log(req.body);

               const inviteToken = req.params['invite_token'];

               console.log('Ключ приглашения:');
               console.log(inviteToken);

               const fullName = req.body.fullName;
               const password = req.body.password;
               const email = req.body.email;

               if (inviteToken == null) {
                   res.json({
                       message: 'Для регистрации необходим ключ приглашения'
                   }).status(400);
               }

               if (fullName == null || password == null || email == null) {
                   res.json({
                       message: 'Для регистрации необходимо указать ФИО, пароль и почту'
                   }).status(400);
               }

               const inviteTokenDB = await sequelizeManager.InviteToken.findOne({
                   where: {
                       token: inviteToken
                   }});

               if (inviteTokenDB != null && inviteTokenDB.isActual) {
                   inviteTokenDB.isActual = false;
                   await inviteTokenDB.save();

                   if (email.match(emailRegex)) {
                       if (password.toString().match(passwordRegex)) {
                           const user = await sequelizeManager.User.create({
                               fullName: fullName,
                               role: roles.client
                           });

                           const userPassword = await sequelizeManager.UserPassword.create({
                               userId: user.id,
                               passwordHash: createHash('SHA256').update(password).digest('hex')
                           })

                           const userInfo = await sequelizeManager.UserInfo.create({
                               userId: user.id,
                               email: email
                           });

                           res.json({
                               message: 'Регистрация прошла успешно'
                           }).status(201);
                       } else {
                           res.json({
                               message: 'Минимальная длина пароля - 8 символов. Также пароль не может содержать пробел'
                           }).status(400);
                       }
                   } else {
                       res.json({
                           message: 'Некорректная почта'
                       }).status(400);
                   }
               } else {
                   res.json({
                       message: 'Ссылка на регистрацию не действительна'
                   }).status(400);
               }


           } catch (ex) {
               res.status(500);
           }
        });

        apiRouter.put('/invite', async function (req, res) {
            const user = req.user

            if (user != null) {
                if (user.role === roles.admin) {
                    const seconds = new Date().getSeconds();
                    const inviteKey = accessTokenManager.generateKey({
                        createdAtInSeconds: seconds
                    });

                    await sequelizeManager.InviteToken.create({
                        token: inviteKey,
                        isActual: true
                    });

                    res.status(201).json({
                        inviteKey: inviteKey
                    });
                } else {
                    res.status(200).json({
                        message: 'Только адмнистратор может создавать пришлашения на регистрацию'
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Вызов данного метода требует авторизации'
                })
            }
        })
    },
}