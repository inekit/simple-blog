const servicePreset = require('../services/crud.service').getService('Post', ['title', 'text']);
const postsService = require('../services/posts.service');

function getAllCreator(showText = true) {
  return async function getAll(req, res, next) {
    postsService
      .get(Object.assign(req.query, { showText }))
      .then((data) => res.send(data))
      .catch((error) => next(error));
  };
}

async function addOne(req, res, next) {
  postsService
    .add(
      Object.assign(req.body, {
        images: req.body?.['images[]'],
        alts: req.body['alts[]'],
        previewsBinary: req.files?.['images[]'],
      })
    )
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

async function editOne(req, res, next) {
  postsService
    .edit(
      Object.assign(req.body, {
        images: req.body?.['images[]'],
        alts: req.body['alts[]'],
        previewsBinary: req.files?.['images[]'],
      })
    )
    .then((data) => res.send(data))
    .catch((error) => next(error));
}

function deleteOne(req, res, next) {
  postsService
    .delete(req.body)
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
