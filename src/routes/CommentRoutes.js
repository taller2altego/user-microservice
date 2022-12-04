// modules
const router = require('express').Router();

// controllers
const validateComment = require('../controller/comments/CommentValidate');
const CommentController = require('../controller/comments/CommentController');

// utils
const logger = require('../../winston');

module.exports = app => {
  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  const logInput = (req, res, next) => {
    logger.info(JSON.stringify(req.body, undefined, 2));
    logger.info(JSON.stringify(req.query, undefined, 2));
    next();
  };

  app.use('/comments', router);
  router.get('/user', logInput, CommentController.getUserCommentsById, handlerResponse);
  router.get('/driver', logInput, CommentController.getDriverCommentsById, handlerResponse);
  router.post('/user', logInput, validateComment, CommentController.createUserComment, handlerResponse);
  router.post('/driver', logInput, validateComment, CommentController.createDriverComment, handlerResponse);
};
