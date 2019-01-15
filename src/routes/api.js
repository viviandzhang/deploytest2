// dependencies
const express = require('express');

// models
const Dilemma = require('../models/dilemma');
const Comment = require('../models/comment');

const router = express.Router();

// get Dilemmas:
router.get('/dilemmas', function(req, res) {
    Dilemma.find({}, function(err, dilemmas) {
        res.send(dilemmas);
    });
});

// post Dilemma
router.post('/story', function(req, res) {
    // CODE TGT: Create a new story with the "content" parameter
    // Question: Do we get content with req.body.content or req.query.content? 
    // req.body because this is a post request
    const newStory = new Story({
        'creator_id': 'anonid',
        'creator_name': 'Anonymous',
        'content': req.body.content
    });
    // Save the story
    newStory.save(function(err, story) {
        if (err) console.log(err);
    });
    // Send an empty response
    res.send({});
});