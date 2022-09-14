const UserModel = require('../model/UserModel');

class UserRepository {
  constructor() { }

  signUp(body) {
    return UserModel.create(body);
  }

  findAll() {
    return UserModel.findAll();
  }

  findById(id) {
    return UserModel.findByPk(id);
  }

  findUserByUsername(username) {
    return UserModel.findOne({ where: { username } });
  }

  patchById(id, body) {
    return UserModel.update(body, { where: { id } });
  }

  patchByUsername(username, body) {
    return UserModel.update(body, { where: { username } });
  }

  removeById(id) {
    return UserModel.destroy({ where: { id } });
  }

  findUserIdByUsername(username) {
    return UserModel.findOne({ where: { username } })
      .then((user) => {
        return user.id;
      })
  }
}

module.exports = new UserRepository();