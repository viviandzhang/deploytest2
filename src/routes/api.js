// dependencies
const express = require('express');

// models
const Dilemma = require('../models/dilemma');
//const Comment = require('../models/comment');

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
router.post('/dilemma', function(req, res) {
    const newDilemma = new Dilemma({
        'creator_id'        : 'anon_id',
        'creator_name'      : 'anon',
        'timestamp'         : null,
        'categories'        : ['Uncategorized'],
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

module.exports = router;
