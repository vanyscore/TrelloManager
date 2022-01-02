const express = require('express');
const path = require('path');
const app = express();
const dbManager = require('./models/manager_sequelize');

const rootPath = __dirname.substring(0, __dirname.lastIndexOf('\\'));
const apiRouter = express.Router();

app.use(express.static(path.join(rootPath, 'client/build')));
app.use('/api', apiRouter);

apiRouter.get('/about', function(req, resp) {
    resp.end('Hello from api');
});

apiRouter.get('/user/admin', (req, res) => {
    dbManager.sequalize.sync({}).then((seq) => {
        dbManager.User.findByPk(1).then((user) => {
            console.log(`Admin name: ${user.fullName}`);
            console.log(`Admin role: ${user.role}`);

            res.status(200).json({
                admin: user.fullName,
                role: user.role
            });
        });

        return seq;
    }).catch((ex) => {
        console.log(ex);

        res.status(500).json({
            error: "Ошибка сервера"
        });
    });
});

app.get('*', function(req, resp) {
    resp.sendFile(path.join(rootPath, 'client/build/index.html'));
});

app.listen(3000);