const servicePreset = require('../services/crud.service').getService('Post', ['title', 'text']);
const postsService = require('../services/posts.service');
const { getPosts, addPost, editPost } = postsService;

function getAllCreator(showText = true) {
  return async function getAll(req, res, next) {
    getPosts(Object.assign(req.query, { showText }))
      .then((data) => res.send(data))
      .catch((error) => next(error));
  };
}

async function addOne(req, res, next) {
  addPost(req.body)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

async function editOne(req, res, next) {
  editPost(req.body)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function deleteOne(req, res, next) {
  servicePreset
    .delete(req.body.id)
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

module.exports = {
  getAll: getAllCreator(false),
  getAllWithText: getAllCreator(true),
  getPostsAdmin: getAllCreator(true),
  addOne,
  editOne,
  deleteOne,
};
