const UserRepository = require('../repository/UserRepository');

class UserService {
  async signUp(username, password) {
    return UserRepository.signUp(username, password);
  }
}

module.exports = new UserService();