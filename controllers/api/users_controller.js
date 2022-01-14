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
    }
}