var express = require('express');
var router = express.Router();
var PostsController = require('../controllers/posts.controller');

router.get('/posts', PostsController.getAll);

module.exports = router;
