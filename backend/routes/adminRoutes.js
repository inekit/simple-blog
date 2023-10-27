var express = require('express');
var router = express.Router();
var { login, register, authAdmin, auth } = require('../controllers/user.authentication');
var PostsController = require('../controllers/posts.controller');
var fileUpload = require('express-fileupload');
router.use(fileUpload({}));

router.get('/posts', auth, PostsController.getPostsAdmin);

router.post('/posts', auth, PostsController.addOne);

router.put('/posts', auth, PostsController.editOne);

router.delete('/posts', auth, PostsController.deleteOne);

router.post('/login', login.local);
router.put('/register', register.local);
router.get('/logout', auth, (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    return res.send(JSON.stringify({ isAuthenticated: req.isAuthenticated() }));
  });
});

module.exports = router;
