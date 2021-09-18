const express = require('express');
const path = require('path');
const app = express();

const rootPath = __dirname.substring(0, __dirname.lastIndexOf('\\'));

const apiRouter = express.Router();

app.use(express.static(path.join(rootPath, 'client/build')));
app.use('/api', apiRouter);

apiRouter.get('/about', function(req, resp) {
    resp.end('Hello from api');
});


app.get('*', function(req, resp) {
    resp.sendFile(path.join(rootPath, 'client/build/index.html'))
});

app.listen(3000);