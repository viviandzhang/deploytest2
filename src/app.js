// libraries
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');

// local dependencies
const db = require('./db');
const views = require('./routes/views');
const api = require('./routes/api');

// initialize express app
const app = express();

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set routes
app.use('/', views);
app.use('api', api);
app.use('/static', express.static('public'));

// route error handler
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

// post config
const port = 3000;
server = http.Server(app);
server.listen(port, function () {
    console.log('server listening on port ' + port);
});