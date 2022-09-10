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

  patchById(id, body) {
    return UserModel.update(body, { where: { id } });
  }

  removeById(id) {
    return UserModel.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();