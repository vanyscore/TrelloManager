const trelloInteractor = require('../../interactors/trello_interactor')
const sequelize = require('../../models/sequelize_manager')
const roles = require('../../models/roles')
const cardStatus = require('../../models/card_status')

function parseCard(card, user) {
    return {
        id: card.id,
        title: card.title,
        description: card.description,
        status: cardStatus.parseByCode(card.statusCode),
        author: {
            id: user.id,
            fullName: user.fullName
        }
    }
}

module.exports = {
    handle: function(apiRouter) {
        apiRouter.get('/cards', async function(req, res) {
            try {
                const user = req.user

                if (user == null) {
                    res.status(401).json({
                        message: 'Вызов данного метода требует авторизации'
                    })
                } else {
                    const role = user.role

                    if (role === roles.admin) {
                        const cards = await sequelize.Card.findAll()
                        const result = []

                        for(const c of cards) {
                            const user = await sequelize.User.findByPk(c.authorId)

                            const card = parseCard(c, user)

                            result.push(card)
                        }

                        res.status(200).json(
                            result
                        )
                    } else {
                        const cards = await sequelize.Card.findAll({
                            where: {
                                authorId: user.id
                            }
                        })
                        const result = []

                        for(const c of cards) {
                            const card = parseCard(c, user)

                            result.push(card)
                        }

                        res.status(200).json(
                            result
                        )
                    }
                }
            } catch (ex) {
                res.status(500).end()
            }
        })

        apiRouter.put('/card', async function(req, res) {
            console.log('try make card')

            try {
                const body = req.body

                const title = body['title']
                const description = body['description']

                if (title == null || description == null) {
                    res.status(400).json({
                        message: 'Заявка должна содержать описание и заголовок'
                    })
                } else {
                    await sequelize.Card.create({
                        authorId: req.user.id,
                        title: title,
                        description: description,
                        trelloId: null,
                        statusCode: cardStatus.sent.code
                    })

                    console.log('card created')

                    res.status(200).end()
                }
            } catch (ex) {
                res.status(500).end()
            }
        })
    }
}