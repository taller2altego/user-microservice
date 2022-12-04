const CommentRepository = require('../repository/CommentRepository');

class CommentService {
  createUserComment(body) {
    const createBody = { ...body, isUserComment: true };
    return CommentRepository.createComment(createBody);
  }

  createDriverComment(body) {
    const createBody = { ...body, isUserComment: false };
    return CommentRepository.createComment(createBody);
  }

  getUserCommentsById(userId) {
    return CommentRepository.findAllCommentsById(userId, true);
  }

  getDriverCommentsById(userId) {
    return CommentRepository.findAllCommentsById(userId, false);
  }
}

module.exports = new CommentService();
