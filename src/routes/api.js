// dependencies
const express = require('express');
//const connect = require('connect-ensure-login'); 

// models
const Dilemma = require('../models/dilemma');
const Comment = require('../models/comment');

const router = express.Router();

//make/whoam i route return get user 
router.get('/whoami', function(req, res) {
  
    if(req.isAuthenticated()){
      res.send(req.user);
    }
    else{
      res.send({});
    }
  });


// Dilemmas:
router.get('/dilemmas', function(req, res) {
    Dilemma.find({}, function(err, dilemmas) {
        res.send(dilemmas);
    });
});

router.get('/dilemma', function(req, res) {
    Dilemma.findOne({_id: req.query._id}, function(err, dilemma) {
        res.send(dilemma);
    })
})

router.post('/dilemma', function(req, res) {
    const newDilemma = new Dilemma({
        'creator_id'        : req.body.creator_id,
        'creator_color'     : req.body.creator_color,
        'creator_alias'     : req.body.creator_alias,
        'timestamp'         : req.body.timestamp,
        'categories'        : req.body.categories,
        'title'             : req.body.title,
        'body'              : req.body.body,
        'active'            : true,
        'votes_yes'         : 0,
        'votes_no'          : 0
    });
    newDilemma.save(function(err, dilemma) {
        if (err) console.log(err);
    });
    res.send({});
});

// COMMENTS
router.get('/comments', function(req, res) {
    Comment.find({ parent_id: req.query.parent_id }, function(err, comments) {
        res.send(comments);
    })
})

router.post('/comment', function(req, res) {
    const newComment = new Comment({
        'creator_id'      : 'anon id',
        'creator_alias'   : 'Anonymous',
        'creator_color'   : 'pink',
        'timestamp'       : req.body.timestamp,
        'body'            : req.body.body,
        'yes_or_no'       : req.body.yes_or_no,
        'votes'           : 0,
        'parent_id'       : req.body.parent_id,
    });
    newComment.save(function(err, comment) {
        if (err) console.log(err);
    });
    res.send({});
});

module.exports = router;