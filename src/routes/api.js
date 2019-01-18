// dependencies
const express = require('express');
//const connect = require('connect-ensure-login'); }authentication??

// models
const Dilemma = require('../models/dilemma');
const Comment = require('../models/comment');

const router = express.Router();


// user/authentication stuff- don't completely understand
//make/whoam i route return get user 
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
      color: 'Anon was here',
    });
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
        'creator_id'        : 'anon_id',
        'creator_color'     : 'pink',
        'creator_alias'     : 'Anon',
        'timestamp'         : null,
        'categories'        : req.body.categories,
        'title'             : req.body.title,
        'body'              : req.body.body,
        'active'            : true,
        'votes_yes'         : 3,
        'votes_no'          : 4
    });
    newDilemma.save(function(err, dilemma) {
        if (err) console.log(err);
    });
    res.send({});
});

// COMMENTS
router.get('/comments', function(req, res) {
    Comment.find({ 
        parent_id: req.query.parent_id,
        yes_or_no: req.query.yes_or_no
    }, function(err, comments) {
        res.send(comments);
    })
})

router.post('/comment', function(req, res) {
    const newComment = new Comment({
        creator_id      : 'anon id',
        creator_alias   : 'Anonymous',
        creator_color   : 'pink',
        timestamp       : null,
        body            : 'Definitely sacrilegious',
        yes_or_no       : 'yes',
        votes           : 0,
        parent_id       : '5c410e27c407c885b68c23b9',
    });

    newComment.save(function(err, comment) {
        if (err) console.log(err);
    });

    res.sendStatus({});
});

module.exports = router;