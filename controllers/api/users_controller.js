const roles = require('../../models/roles');
const sequelize = require('../../models/sequelize_manager');

module.exports = {
    handle: function(apiRouter) {
        apiRouter.get('/profile', async function(req, res) {
            try {
                const user = req.user;

                if (user != null) {
                    res.status(200).json(user)
                } else {
                    res.status(401).json({
                        message: "Вызов данного метода требует авторизации"
                    })
                }
            } catch (ex) {
                res.status(500);
            }
        })

        apiRouter.get('/user/:id?', async function(req, res) {
            const userId = req.params['id'];
            const user = req.user;

            try {
                if (user == null) {
                    res.status(401).json({
                        message: "Вызов данного метода требует авторизации"
                    });
                } else {
                    if (user.role === roles.client) {
                        res.status(403).json({
                            message: "Вам запрещен доступ к вызову данного метода"
                        });
                    }
                }

                if (userId == null) {
                    res.status(401).json({
                        message: "Необходимо указать id пользователя"
                    })
                } else {
                    const user = await sequelize.User.findByPk(userId);

                    if (user == null) {
                        res.json({
                            message: "Пользователь не найден"
                        }).status(404);
                    } else {
                        console.log(user);

                        const userInfo = await sequelize.UserInfo.findOne({
                            where: {
                                userId: user.id
                            }
                        });

                        res.status(200).json({
                            id: user.id,
                            email: userInfo.email,
                            role: user.role
                        });
                    }
                }
            } catch (ex) {
                res.status(500);
            }
        });

        apiRouter.get('/users', async function(req, res) {
            const user = req.user;

            try {
                if (user == null) {
                    res.status(401).json({
                        message: "Вызов данного метода требует авторизации"
                    });
                } else {
                    if (user.role === roles.client) {
                        res.status(403).json({
                            message: "Вам запрещен доступ к вызову данного метода"
                        });
                    }
                }

                const users = await sequelize.User.findAll();

                for (const usr of users) {
                    const userInfo = await sequelize.UserInfo.findOne(
                        {
                            where: {
                                userId: usr.id
                            }
                        }
                    );

                    usr.email = userInfo.email;
                }

                res.status(200).json(users);
            } catch (ex) {
                res.status(500);
            }
        });
    }
}