const express = require('express');
const bodyParser = require('body-parser');

//const postModel = require('../model/posts.js');
//const voteModel = require('../model/votes.js');
const phoneModel = require('../model/phones.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/phones', function(req, res, next) {
    phoneModel.list().then(phones => {
        res.json(phones);
    }).catch(next);
});

// Create
router.post('/phones', function(req, res, next) {
    const {date, end, diff} = req.body;
    // if (!mood || !text) {
    //     const err = new Error('Mood and text are required');
    //     err.status = 400;
    //     throw err;
    // }
    phoneModel.create(date, end, diff).then(phone => {
        res.json(phone);
    }).catch(next);
});

// Vote
// router.post('/posts/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res, next) {
//     const {id, mood} = req.params;
//     if (!id || !mood) {
//         const err = new Error('Post ID and mood are required');
//         err.status = 400;
//         throw err;
//     }
//     voteModel.create(id, mood).then(post => {
//         res.json(post);
//     }).catch(next);
// });

module.exports = router;
