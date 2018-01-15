const express = require('express');
const bodyParser = require('body-parser');

const postModel = require('../model/posts.js');
const voteModel = require('../model/votes.js');
const todoModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/todos', function(req, res, next) {
    todoModel.list(req.query.unaccomplishedOnly, req.query.searchText).then(todos => {
        res.json(todos);
    }).catch(next);
});

// Create
router.post('/todos', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.create(mood, text).then(todo => {
        res.json(todo);
    }).catch(next);
});

// Accomplish Todo
router.post('/todos/:id', function(req, res, next) {
    const {id} = req.params;
    if (!id) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    todoModel.accomplish(id).then(todo => {
        res.json(todo);
    }).catch(next);
});

module.exports = router;
