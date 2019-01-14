const http = require('http');
const express = require('express');
const views = require('./routes/views');

const app = express();

app.use('/', views);
app.use('/static', express.static('public'));

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status | 500);
    res.send({
        status: err.status,
        message: err.message,
    })
});

const port = 3000;
server = http.Server(app);
server.listen(port, function () {
    console.log('server listening on port ' + port);
});