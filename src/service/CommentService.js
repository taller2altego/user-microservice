const CommentRepository = require('../repository/CommentRepository');

class CommentService {
  createUserComment(body) {
    body['isUserComment'] = true;
    return CommentRepository.createComment(body);
  }

  createDriverComment(body) {
    body['isUserComment'] = false;
    return CommentRepository.createComment(body);
  }

  getUserCommentsById(userId) {
    return CommentRepository.findAllCommentsById(userId, true);
  }
  
  getDriverCommentsById(userId) {
    return CommentRepository.findAllCommentsById(userId, false);
  }
}

module.exports = new CommentService();