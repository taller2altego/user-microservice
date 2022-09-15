const UserModel = require('../model/UserModel');

class UserRepository {
  constructor() { }

  signUp(body) {
    return UserModel
      .create(body)
      .then(user => user.toJSON());
  }

  findAll() {
    return UserModel
      .findAll()
      .then(users => users.map(user => user.toJSON()));
  }

  findById(id) {
    return UserModel
      .findByPk(id)
      .then(user => user.toJSON());
  }

  findUserByEmail(email) {
    return UserModel
      .findOne({ where: { email } })
      .then(user => user.toJSON());
  }

  patchById(id, body) {
    return UserModel.update(body, { where: { id } });
  }

  patchByEmail(email, body) {
    return UserModel.update(body, { where: { email } });
  }

  removeById(id) {
    return UserModel.destroy({ where: { id } });
  }

  findUserIdByEmail(email) {
    return UserModel.findOne({ where: { email } })
      .then((user) => {
        return user.id;
      })
  }
}

module.exports = new UserRepository();