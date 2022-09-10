const UserRepository = require('../repository/UserRepository');

class UserService {
  async signin(username, password) {
    return 'signin';
  }

  async signup(username, password) {
    return 'signup';
  }
}

module.exports = new UserService();