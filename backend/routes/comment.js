const express = require('express');
const pool = require('../db');

const comment = require('../models/comment');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger){

  /*
    createNewComment,
    findCommentsByPostId,
    findCommentsByAuthor,
    findCommentsOnPost,
    findCommentsByPostIdExcludePrivate,
    findCommentsByAuthorExcludePrivate,
    findCommentsOnPostExcludePrivate,
    getAllComments,
    getAllCommentsExcludePrivate,
    updateCommentPost,
    updateCommentPrivacy,
    deleteComment,
  */


    app.post('/comment/newcomment', authenticateJWT, async (req, res) => {
        const body = req.body;
        try {
            const result = await comment.createNewComment(body.postId, body.commentAuthor, body.post);
            return res.status(201).json(result); 
            } catch (err) {
              console.log("HERE IDIOT; " + err);
              return res.status(400).json({ message: "Failed to make a new comment." });
            }
        
    });

    app.get('/comment/allcomments', authenticateJWT, async (req, res) => {
        try {
            
            const result = await comment.getAllComments();
            res.status(200).json(result);
          } catch (err) {
            res.status(401).json({ message: 'Could Not Get All comments'});
          }
        });

        app.get('/comment/allpubliccomments', authenticateJWT, async (req, res) => {
            try {
                const result = await comment.getAllCommentsExcludePrivate();
                res.status(200).json(result);
              } catch (err) {
                res.status(400).json({ message: 'Could Not Get All comments'});
              }
            });


    app.get('/comment/byid', authenticateJWT, async (req, res, next) => {
        try {
            var stadio = req.query.postId;
            if (req.query.owner == undefined){
                stadio = req.body.postId;
            }
            const result = await comment.findCommentsByPostId(stadio);
            console.log("HERE RESULT: " + result);
            res.status(200).json(result);
            
        } catch (err) {
            console.error("Failed to get post comments: ", err);
            res.sendStatus(400).json({ message: err.toString() });
        }

});

app.get('/comment/publicbyid', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.postId;
        if (req.query.owner == undefined){
            stadio = req.body.postId;
        }
        const result = await comment.findCommentsByPostIdExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get post comments: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/comment/byauthor', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.commentAuthor;
        if (req.query.commentAuthor == undefined){
            stadio = req.body.commentAuthor;
        }
        const result = await comment.findCommentsByAuthor(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get comments by author: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/comment/publicbyauthor', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.commentAuthor;
        if (req.query.commentAuthor == undefined){
            stadio = req.body.commentAuthor;
        }
        const result = await comment.findCommentsByAuthorExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get comments by author: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/comment/bypost', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.postId;
        if (req.query.postId == undefined){
            stadio = req.body.postId;
        }
        const result = await comment.findCommentsOnPost(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get root comments: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/comment/publicbypost', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.postId;
        if (req.query.postId == undefined){
            stadio = req.body.postId;
        }
        const result = await comment.findCommentsOnPostExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get root comments: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});


app.put('/comment/updatecomment', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await comment.updateCommentPost(body.commentId, body.new_post);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ message: 'Could Not Update post' });
    }
  });

  app.put('/comment/updateprivacy', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await comment.updateCommentPrivacy(body.commentId, body.privacy);
      return res.status(202).json(result);
    } catch (err) {
      return res.status(400).json({ message: 'Could Not Update privacy' });
    }
  });

  app.put('/comment/like', authenticateJWT, async (req, res) => {
    try {
      var stadio = req.query.commentId;
        if (req.query.commentId == undefined){
            stadio = req.body.commentId;
        }
      result = await comment.updateLikeCounter(stadio);
      return res.status(202).json(result);
    } catch (err) {
      return res.status(400).json({ message: 'Could Not Like Comment' });
    }
  });

  app.put('/comment/unlike', authenticateJWT, async (req, res) => {
    try {
      var stadio = req.query.commentId;
        if (req.query.commentId == undefined){
            stadio = req.body.commentId;
        }
      result = await comment.downdateLikeCounter(stadio);
      return res.status(202).json(result);
    } catch (err) {
      return res.status(400).json({ message: 'Could Not Unlike Comment' });
    }
  });

  app.delete('/comment/delete', authenticateJWT, async (req, res) => {
    try {
      var stadio = req.query.commentId;
        if (req.query.commentId == undefined){
            stadio = commentId;
        }
      result = await comment.deleteComment(body.stadio);
      return res.status(204).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete comment' });
    }
  });

}