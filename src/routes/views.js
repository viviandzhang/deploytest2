const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'src/views' });
});

router.get('/activity', function (req, res) {
    res.sendFile('activity.html', { root: 'src/views' });
});

router.get('/signin', function (req, res) {
    res.sendFile('signin.html', { root: 'src/views' });
});

router.get('/static-feed', function (req, res) {
    res.sendFile('staticFeed.html', { root: 'src/views' });
});

router.get('/newuser', function (req, res) {
    res.sendFile('newuser.html', { root: 'src/views' });
});

module.exports = router;