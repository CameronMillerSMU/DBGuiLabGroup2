const express = require('express');
const pool = require('../db');

const comment = require('../models/comment');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

module.exports = function routes(app, logger){


    app.post('/newCommentRoot', authenticateJWT, async (req, res) => {
        const body = req.body;
        try {
            const result = await comment.createNewCommentRoot(body.postId, body.commentAuthor, body.post);
            return res.status(201).json(result); 
            } catch (err) {
                console.log("ERROR HERE IDIOT: " + err);
              return res.status(400).json({ message: "Failed to make a new root comment." });
            }
        
    });

    app.post('/newCommentReply', authenticateJWT, async (req, res) => {
        const body = req.body;
        try {
            const result = await comment.createNewCommentReply(body.postId, body.commentAuthor, body.post, body.replyTo);
            return res.status(201).json(result); 
            } catch (err) {
                console.log("ERROR HERE IDIOT: " + err);
              return res.status(400).json({ message: "Failed to make a new reply comment." });
            }
        
    });


    app.get('/allComments', authenticateJWT, async (req, res) => {
        try {
            console.log("ERROR 1");
            const result = await comment.getAllComments();
            res.status(200).json(result);
          } catch (err) {
            res.status(401).json({ message: 'Could Not Get All comments'});
          }
        });

        app.get('/allCommentsPrivacy', authenticateJWT, async (req, res) => {
            try {
                console.log("ERROR 1");
                const result = await comment.getAllCommentsExcludePrivate();
                res.status(200).json(result);
              } catch (err) {
                res.status(400).json({ message: 'Could Not Get All comments'});
              }
            });


    app.get('/commentsByPost', authenticateJWT, async (req, res, next) => {
        try {
            var stadio = req.query.owner;
            if (req.query.owner == undefined){
                stadio = null;
            }
            const result = await comment.findcommentsByPostId(stadio);
            console.log("HERE RESULT: " + result);
            res.status(200).json(result);
            
        } catch (err) {
            console.error("Failed to get post comments: ", err);
            res.sendStatus(400).json({ message: err.toString() });
        }

});

app.get('/commentsByPostPrivacy', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await comment.findcommentsByPostIdExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get post comments: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/commentsByAuthor', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await comment.findcommentsByAuthor(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get comments by author: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/commentsByAuthorPrivacy', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await comment.findcommentsByAuthorExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get comments by author: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/commentsOnPost', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await comment.findcommentsOnPost(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get root comments: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/commentsOnPostPrivacy', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await comment.findcommentsOnPostExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get root comments: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/commentsOnComment', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await comment.findcommentsOnComment(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get comment replies: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.get('/commentsOnCommentPrivacy', authenticateJWT, async (req, res, next) => {
    try {
        var stadio = req.query.owner;
        if (req.query.owner == undefined){
            stadio = null;
        }
        const result = await comment.findcommentsOnCommentExcludePrivate(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get comment replies: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

});

app.put('/updateCommentPost', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await comment.updateCommentPost(body.commentId, body.new_post);
      return res.status(202).json(result);
    } catch (err) {
      return res.status(400).json({ message: 'Could Not Update post' });
    }
  });

  app.put('/updateCommentPrivacy', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await comment.updateCommentPrivacy(body.commentId, body.privacy);
      return res.status(202).json(result);
    } catch (err) {
      return res.status(400).json({ message: 'Could Not Update privacy' });
    }
  });

  app.delete('/deleteComment', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await comment.deleteComment(body.commentId);
      return res.status(204).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete comment' });
    }
  });

  app.delete('/deleteAuthorsComments', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await comment.deleteCommentsByAuthor(body.commentAuthor);
      return res.status(204).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete authors comments' });
    }
  });

  app.delete('/deletePostComments', authenticateJWT, async (req, res) => {
    try {
      const body = req.body;
      result = await comment.deleteCommentsOnPost(body.postId);
      return res.status(204).json(result);
    } catch (err) {
      return res.status(401).json({ message: 'Could Not Delete post comments' });
    }
  });



}