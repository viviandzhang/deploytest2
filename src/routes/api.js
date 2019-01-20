// dependencies
const express = require('express');
//const connect = require('connect-ensure-login'); 

// models
const Dilemma = require('../models/dilemma');
const Comment = require('../models/comment');
const User = require('../models/user');

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

router.get('/userById', function(req, res) {
    User.findById({_id: req.query._id}, function(err, user){
        res.send(user);
    })
});

router.post('/updateUserName', function(req, res) {
    User.findById({_id: req.body._id}, function(err, currentUser){
        if (err) console.log(err);
        currentUser.adjective = req.body.adjective;
        currentUser.color = req.body.color;

        currentUser.save(function(err, updatedUser) {
            if (err) console.log(err);
        })
    })
    res.send({});
})

router.post('/addCommentToUser', function(req, res) {
    User.findById({_id: req.body._id}, function(err, currentUser){
        if (err) console.log(err);
        let newArray = currentUser.liked_comments;
        newArray.push(req.body.comment_id);
        currentUser.liked_comments = newArray;

        currentUser.save(function(err, updatedUser) {
            if (err) console.log(err);
        })
    })
    res.send({});
});

router.post('/removeCommentFromUser', function(req, res) {
    console.log("removing");
    User.findById({_id: req.body._id}, function(err, currentUser){
        if (err) console.log(err);
        let newArray = currentUser.liked_comments;
        console.log("liked comments: ");
        for (let i=0; i<newArray.length; i++){
            if (newArray[i]===req.body.comment_id){
                console.log("found: "+newArray[i]);
                newArray.slice(i, 1);
                console.log("removed, now array is:");
                console.log(newArray);
            }
        }
        currentUser.liked_comments = newArray;

        currentUser.save(function(err, updatedUser) {
            if (err) console.log(err);
        })
    })
    res.send({});
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
        'creator_id'      : req.body.creator_id,
        'creator_alias'   : req.body.creator_alias,
        'creator_color'   : req.body.creator_color,
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

router.post('/addVoteToComment', function(req, res) {
    Comment.findById({_id: req.body._id}, function(err, currentComment){
        if (err) console.log(err);
        currentComment.votes = currentComment.votes + 1;
        currentComment.save(function(err, updatedComment) {
            if (err) console.log(err);
        })
    })
    res.send({});
});

router.post('/subtractVoteFromComment', function(req, res) {
    Comment.findById({_id: req.body._id}, function(err, currentComment){
        if (err) console.log(err);
        currentComment.votes = currentComment.votes - 1;
        currentComment.save(function(err, updatedComment) {
            if (err) console.log(err);
        })
    })
    res.send({});
});


module.exports = router;