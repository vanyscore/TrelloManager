const express = require('express');
const apiControllers = require('./controllers/api_controllers');

const app = express();

app.use(express.json());

const apiRouter = express.Router();
app.use('/api', apiRouter);
apiControllers.handle(apiRouter);

app.get('*', (req, res) => {
    res.status(404)
        .json({
            message: 'Путь не найден'
        })
});

app.listen(3000);