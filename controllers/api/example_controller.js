const dbManager = require("../../models/sequelize_manager")

module.exports = {
    handle: function(apiRouter) {
        apiRouter.get('/about', function(req, resp) {
            resp.end('Hello from api')
        })

        apiRouter.get('/user/admin', (req, res) => {
            dbManager.sequalize.sync({}).then((seq) => {
                dbManager.User.findByPk(1).then((user) => {
                    console.log(`Admin name: ${user.fullName}`)
                    console.log(`Admin role: ${user.role}`)

                    res.status(200).json({
                        message: 'Информация об админе',
                        admin: user.fullName,
                        role: user.role
                    })
                })
            }).catch((ex) => {
                console.log(ex)

                res.status(500).json({
                    error: "Ошибка сервера"
                })
            })
        })
    }
}