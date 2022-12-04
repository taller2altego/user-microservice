const CommentModel = require('../model/CommentModel');

class CommentRepository {
  createComment(body) {
    return CommentModel
      .create(body)
      .then(comment => comment.toJSON());
  }

  findAllCommentsById(userId, isUserComment) {
    return CommentModel
      .findAll({ where: { userId, isUserComment } })
      .then(comments => comments.map(comment => comment.toJSON()));
  }
}

module.exports = new CommentRepository();
