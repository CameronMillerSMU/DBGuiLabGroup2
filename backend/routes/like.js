const express = require('express');
const pool = require('../db');

const User = require('../models/users');
const like = require('../models/like');

const { authenticateJWT, authenticateWithClaims } = require('../middleware/auth');

/*
    createNewCommentLike,
    createNewPostLike,
    getAllLikes,
    findLikesOnComment,
    findLikesOnPost,
    findLikesByUser,
    deleteLike,
    deleteLikesOnComment,
    deleteLikesOnPost
*/

module.exports = function routes(app, logger){


    app.post('./', authenticateJWT, async (req, res) =>  {
        const body = req.body;
        try {
            const result = await like.createNewCommentLike(body.user, body.commentId);
            return res.status(201).json(result); 
            } catch (err) {
                console.log("ERROR HERE IDIOT: " + err);
              return res.status(400).json({ message: "Failed to like this comment. Try again later.", err });
            }
        
    })

    app.post('./', authenticateJWT, async (req, res) =>  {
        const body = req.body;
        try {
            const result = await like.createNewPostLike(body.user, body.postId);
            return res.status(201).json(result); 
            } catch (err) {
                console.log("ERROR HERE IDIOT: " + err);
              return res.status(400).json({ message: "Failed to like this post. Try again later.", err });
            }
        
    })

    app.get('./likes/all', authenticateJWT, async (req, res) =>  {
        try {
            const result = await like.getAllLikes();
            return res.status(200).json(result); 
            } catch (err) {
              return res.status(400).json({ message: "Failed to get all likes. Try again later.", err });
            }
        
    })

    app.get('./likes', authenticateJWT, async (req, res) =>  {
        
        try {
            var stadio = req.body.commentId;
            if (req.body.commentId == undefined){
                stadio = req.query.commentId;
            }
            const result = await likes.findLikesOnComment(stadio);
            console.log("HERE RESULT: " + result);
            res.status(200).json(result);
            
        } catch (err) {
            console.error("Failed to get this comment's likes: ", err);
            res.sendStatus(400).json({ message: err.toString() });
        }

})

app.get('./likes', authenticateJWT, async (req, res) =>  {
        
    try {
        var stadio = req.body.postId;
        if (req.body.postId == undefined){
            stadio = req.query.postId;
        }
        const result = await likes.findLikesOnPost(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get this post's likes: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})

app.get('./likes', authenticateJWT, async (req, res) =>  {
        
    try {
        var stadio = req.body.user;
        if (req.body.user == undefined){
            stadio = req.query.user;
        }
        const result = await likes.findLikesByUser(stadio);
        console.log("HERE RESULT: " + result);
        res.status(200).json(result);
        
    } catch (err) {
        console.error("Failed to get this user's likes: ", err);
        res.sendStatus(400).json({ message: err.toString() });
    }

})

app.delete('./', authenticateJWT, async (req, res) => {


})


};