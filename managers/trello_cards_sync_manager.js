const sequelize = require('../models/sequelize_manager')
const trelloInteractor = require('../interactors/trello_interactor')
const cardStatus = require('../models/card_status')

module.exports = {
    sync: async function() {
        const localCards = await sequelize.Card.findAll()

        /// Если на сервере нет карты из локального списка
        /// забросить эту локальную карту на сервер
        for (const lCard of localCards) {
            const authorId = lCard.authorId
            const user = await sequelize.User.findByPk(authorId)
            const userInfo = await sequelize.UserInfo.findByPk(user.id)
            const userEmail = userInfo.email

            /// Карточка не была создана на сервере -> Создать
            if (lCard.trelloId === null) {
                console.log('local card:')
                console.log(lCard)


                const trelloId = await trelloInteractor.pushCard(user.fullName, userEmail, lCard.title, lCard.description, lCard.statusCode)

                if (trelloId != null) {
                    lCard.trelloId = trelloId

                    await lCard.save()
                }
            }

            // if (trCard === null) {
            //     trelloInteractor.pushCard(lCard)
            // }

            // /// Если локальная карта обновлена позже серверной
            // /// забросить обновление на сервер
            // if (trCard.updatedAt > lCard) {
            //     trelloInteractor.updateCard(trCard)
            // }
            //
            // /// Если серверная карта обновлена позже локальной
            // /// стянуть изменения на локальный сервер
            // if (lCard.updatedAt > trCard) {
            //     lCard.update()
            //
            //     await lCard.save()
            // }
        }
    }
}