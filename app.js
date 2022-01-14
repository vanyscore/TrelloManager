const express = require('express');
const cookieParser = require('cookie-parser');
const controllers = require('./controllers/controllers');
const trelloInteractor = require('./interactors/trello_interactor');
const sequelize = require('./models/sequelize_manager');
const accessTokenCheckerMiddleware = require('./middlewares/access_token_checker_middleware');

const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(accessTokenCheckerMiddleware);
app.use('/api', apiRouter);

controllers.handle(apiRouter);

app.get('*', (req, res) => {
    res.status(404)
        .json({
            message: 'Путь не найден'
        })
});

// trelloInteractor.getBoards((boards) => {
//     console.log(boards);
// }, (err) => {
//     console.log(err);
// });

app.listen(3000);