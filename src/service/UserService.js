const UserRepository = require('../repository/UserRepository');
const { errors } = require("config");
const {
  userNotFound,
  userAlreadyExists,
  unableToMatchPasswords
} = errors;

const buildError = (objectMessage) => {
  const err = new Error();
  err.statusCode = objectMessage.statusCode;
  err.message = objectMessage.message;
  throw err;
};

class UserService {
  async signUp(body) {
    return UserRepository.findUserByUsername(body.username)
      .then(user => {
        if (user === null) return UserRepository.signUp(body);
        buildError(userAlreadyExists);
      });
  }

  findAllUsers() {
    return UserRepository.findAll();
  }

  findUserById(id) {
    return UserRepository.findById(id).then(user => {
      if (user === null) {
        buildError(userNotFound);
      }
      return user;
    });
  }


  patchUserById(id, body) {
    return this.findUserById(id)
      .then(() => {
        return UserRepository.patchById(id, body);
      });
  }

  patchUserByUsername(username, body) {
    return UserRepository.findUserByUsername(username)
      .then(() => {
        return UserRepository.patchByUsername(username, body);
      });
  }

  removeUserById(id) {
    return this.findUserById(id)
      .then(() => {
        return UserRepository.removeById(id);
      });
  }

  changePasswordByUsername(username, newPassword, newPasswordAgain) {
    if (newPassword === newPasswordAgain) {
      return this.patchUserByUsername(username, { "password": newPassword });
    }
    return buildError(unableToMatchPasswords);
  }
}

module.exports = new UserService();