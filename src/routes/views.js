const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('browse.html', { root: 'src/views' });
});

router.get('/your-activity', function (req, res) {
    res.sendFile('profile.html', { root: 'src/views' });
});

router.get('/signin', function (req, res) {
    res.sendFile('signin.html', { root: 'src/views' });
});

router.get('/static-feed', function (req, res) {
    res.sendFile('staticFeed.html', { root: 'src/views' });
});

module.exports = router;