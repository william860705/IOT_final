const express = require('express');
const bodyParser = require('body-parser');

//const postModel = require('../model/posts.js');
//const voteModel = require('../model/votes.js');
const sleepModel = require('../model/sleeps.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/sleeps', function(req, res, next) {
    sleepModel.list().then(sleeps => {
        res.json(sleeps);
    }).catch(next);
});

// Create
router.post('/sleeps', function(req, res, next) {
    const {date, end, diff} = req.body;
    // if (!mood || !text) {
    //     const err = new Error('Mood and text are required');
    //     err.status = 400;
    //     throw err;
    // }
    sleepModel.create(date, end, diff).then(sleep => {
        res.json(sleep);
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
