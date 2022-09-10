const UserRepository = require('../repository/UserRepository');

class UserService {
  signUp(body) {
    return UserRepository.signUp(body);
  }

  findAllUsers() {
    return UserRepository.findAll();
  }

  findUserById(id) {
    return UserService.findById(id);
  }

  patchUserById(id) {
    return UserService.patchById(id);
  }

  removeUserById(id) {
    return UserService.removeById(id);
  }
}

module.exports = new UserService();