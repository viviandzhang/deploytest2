// libraries
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
<<<<<<< HEAD
const session = require('express-session'); 
=======
//const session = require('express-session'); //for authentication- cookies
>>>>>>> eacfd0244b1903e6a97aee9848acf032727278dc

// local dependencies
const db = require('./db');
const passport = require('./passport');
const views = require('./routes/views');
const api = require('./routes/api');

// initialize express app
const app = express();

// set POST request body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

<<<<<<< HEAD


=======
//AUTHENTICATION 
/* set up sessions
>>>>>>> eacfd0244b1903e6a97aee9848acf032727278dc
app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/signin' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

// logout route
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/signin');
});

<<<<<<< HEAD

=======
>>>>>>> eacfd0244b1903e6a97aee9848acf032727278dc
// set routes
app.use('/', views);
app.use('/api', api);
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