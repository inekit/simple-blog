var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts.controller');
var fileUpload = require('express-fileupload');
router.use(fileUpload({}));

router.get('/posts', PostsController.getPostsAdmin);

router.post('/posts', PostsController.addOne);

router.put('/posts', PostsController.editOne);

router.delete('/posts', PostsController.deleteOne);

module.exports = router;
