const trelloInteractor = require('../../interactors/trello_interactor');
const sequelize = require('../../models/sequelize_manager');
const roles = require('../../models/roles');
const cardStatus = require('../../models/card_status');

module.exports = {
    handle: function(apiRouter) {
        apiRouter.get('/cards', async function(req, res) {
            const user = req.user;

            if (user == null) {
                res.status(401).json({
                    message: 'Вызов данного метода требует авторизации'
                })
            } else {
                const role = user.role;

                if (role === roles.admin) {
                    const cards = await sequelize.Card.findAll();
                    const result = [];

                    for(const c of cards) {
                        const user = await sequelize.User.findByPk(c.authorId);

                        const card = {
                            id: c.id,
                            title: c.title,
                            description: c.description,
                            status: cardStatus.parseByCode(c.statusCode),
                            author: {
                                id: user.id,
                                fullName: user.fullName
                            }
                        }

                        result.push(card);
                    }

                    res.status(200).json(
                        result
                    );
                } else {
                    res.status(200).json({
                        message: 'Карточки для клиента'
                    })
                }
            }
        });
    }
}