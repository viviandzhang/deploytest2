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


// user/authentication stuff- don't completely understand
router.get('/whoami', function(req, res) {
  
    if(req.isAuthenticated()){
      res.send(req.user);
    }
    else{
      res.send({});
    }
  });
  
  
  router.get('/user', function(req, res) {
    res.send({
      _id: 'anonid',
      name: 'Anonymous',
      last_post: 'Anon was here',
    });
  });

// post Dilemma
router.post('/story', function(req, res) {
    const newDilemma = new Dilemma({
        // currently dummy data
        creator_id      : 'anonid',
        creator_name    : 'Anonymous',
        timestamp       : 'Time',
        categories      : 'Categories',
        title           : req.body.title,
        body            : req.body.body,
        active          : true,
        votes_yes       : 1,
        votes_no        : 2,
    });
    // Save the story
    newDilemma.save(function(err, story) {
        if (err) console.log(err);
    });
    // Send an empty response
    res.send({});
});
router.get('/comment', function(req, res) {
    // CODE TGT: Fetch the comments that have the parent given in the "parent" parameter
    Comment.find({ parent: req.query.parent }, function(err, comments) {
        res.send(comments);
    });
});

router.post('/comment', function(req, res) {
    // CODE: populate the parent and content keys below
    const newComment = new Comment({
        creator_id      : 'anonid',
        creator_name    : 'Anonymous',
        timestamp       : 'date',
        body            : req.body.body,
        yes_or_no       : yes,
        votes           : 12,
        parent          : req.body.parent,
    });

    // CODE: save the comment
    newComment.save(function(err, comment) {
        if (err) console.log(err);
    });
    
    res.send({});
});



module.exports = router;
