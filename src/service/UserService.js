const UserRepository = require('../repository/UserRepository');

class UserService {
  signUp(body) {
    return UserRepository.signUp(body);
  }

  findAllUsers() {
    return UserRepository.findAll();
  }

  findUserById(id) {
    return UserRepository.findById(id);
  }

  patchUserById(id, body) {
    return UserRepository.patchById(id, body);
  }

  removeUserById(id) {
    return UserRepository.removeById(id);
  }
}

module.exports = new UserService();