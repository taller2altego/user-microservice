const logger = require('../../../winston');
const CommentService = require('../../service/CommentService');
const handlerError = require('../../utils/handlerError');

class CommentController {
  async createUserComment(req, res, next) {
    return CommentService.createUserComment(req.body)
      .then(() => {
        res.customResponse = { statusCode: 200 };
        next();
      })
      .catch(err => {
        logger.error(JSON.stringify(err, undefined, 2));
        res.customResponse = handlerError(err);
        next();
      });
  }

  async createDriverComment(req, res, next) {
    return CommentService.createDriverComment(req.body)
      .then(() => {
        res.customResponse = { statusCode: 200 };
        next();
      })
      .catch(err => {
        logger.error(JSON.stringify(err, undefined, 2));
        res.customResponse = handlerError(err);
        next();
      });
  }


  async getUserCommentsById(req, res, next) {
    return CommentService.getUserCommentsById(req.body.userId)
      .then((comments) => {
        res.customResponse = { statusCode: 200, comments };
        next();
      })
      .catch(err => {
        logger.error(JSON.stringify(err, undefined, 2));
        res.customResponse = handlerError(err);
        next();
      });
  }

  async getDriverCommentsById(req, res, next) {
    return CommentService.getDriverCommentsById(req.body.userId)
      .then((comments) => {
        res.customResponse = { statusCode: 200, comments };
        next();
      })
      .catch(err => {
        logger.error(JSON.stringify(err, undefined, 2));
        res.customResponse = handlerError(err);
        next();
      });
  }
}

module.exports = new CommentController();