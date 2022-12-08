// modules
const router = require('express').Router();

// controllers
// const validateComment = require('../controller/comments/CommentValidate');
const CommentController = require('../controller/comments/CommentController');

// utils
const logger = require('../../winston');

module.exports = app => {
  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    logger.info(`response: ${JSON.stringify(otherFields, undefined, 2)}`);
    res.status(statusCode).send(otherFields);
  };

  const logInput = (req, res, next) => {
    if (req.query) {
      logger.info(JSON.stringify(req.query, undefined, 2));
      logger.info(`query: ${JSON.stringify(req.query, undefined, 2)}`);
    }

    if (req.params) {
      logger.info(`params: ${JSON.stringify(req.params, undefined, 2)}`);
    }

    if (req.body) {
      logger.info(`body: ${JSON.stringify(req.body, undefined, 2)}`);
    }
    next();
  };

  app.use('/comments', router);
  router.get('/user/:userId', logInput, CommentController.getUserCommentsById, handlerResponse);
  router.get('/driver/:userId', logInput, CommentController.getDriverCommentsById, handlerResponse);
  router.post('/user', logInput, CommentController.createUserComment, handlerResponse);
  router.post('/driver', logInput, CommentController.createDriverComment, handlerResponse);
};
