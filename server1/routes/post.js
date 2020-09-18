const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('../models/post');
const cors = require('./cors');
const authenticate = require('../authenticate');
const validatePostInput = require("../validators/post");

const postRouter = express.Router();

postRouter.use(bodyParser.json());

postRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Post.find({}).sort({ createdAt: -1 })
    .populate('author')
    // .populate('comments.author')
    .then((post) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    }, (err) => next(err))
    .catch((err) => next(err));
})

postRouter.route('/create')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.cors, authenticate.verifyUser, (req, res, next) => {
	req.body.author = req.user._id;
    const post = req.body;
    const { errors, isValid } = validatePostInput(post);
    if (!isValid) {
    	return res.status(400).json(errors);
    }
    Post.create(req.body)
    .then((post) => {
        console.log('Post Created', post);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on this route');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('Delete operation not supported on this route');
})

postRouter.route('/:postId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Post.findById(req.params.postId)
    .populate('author')
    // .populate('comments.author')
    .then((post) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported'+ req.params.postId);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    const { errors, isValid } = validatePostInput(req.body);
	if (!isValid) {
    	return res.status(400).json(errors);
    }
    const { title, body } = req.body;
    Post.findByIdAndUpdate(req.params.postId, {
        $set: { title, body }
    }, { new: true })
    .then((post) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(post);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Post.findByIdAndRemove(req.params.postId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// postRouter.route('/:username')
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .get(cors.cors, (req,res,next) => {
//     Post.find({username: req.params.username})
//     .populate('author')
//     // .populate('comments.author')
//     .then((post) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(post);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })
// postRouter.route('/:username/:postId')
// .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// .get(cors.cors, (req,res,next) => {
//     Post.findById(req.params.postId)
//     .populate('author')
//     .populate('comments.author')
//     .then((post) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(post);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })

module.exports = postRouter;