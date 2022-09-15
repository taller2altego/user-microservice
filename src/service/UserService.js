const UserRepository = require('../repository/UserRepository');
const { errors } = require("config");
const logger = require('../../winston');
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
    return UserRepository.findUserByEmail(body.email)
      .then(user => {
        logger.debug('asd');
        logger.debug(typeof(user));
        if (user === null) {
          return UserRepository.signUp(body);
        }
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

  patchUserByEmail(email, body) {
    return UserRepository.findUserByEmail(email)
      .then(() => {
        return UserRepository.patchByEmail(email, body);
      });
  }

  removeUserById(id) {
    return this.findUserById(id)
      .then(() => {
        return UserRepository.removeById(id);
      });
  }

  changePasswordByEmail(email, newPassword, newPasswordAgain) {
    if (newPassword === newPasswordAgain) {
      return this.patchUserByEmail(email, { "password": newPassword });
    }
    return buildError(unableToMatchPasswords);
  }
}

module.exports = new UserService();