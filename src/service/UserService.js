const UserRepository = require('../repository/UserRepository');
const { errors } = require("config");
const logger = require('../../winston');
const {
  userNotFound,
  userAlreadyExists,
  unableToMatchEmail
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
        logger.debug(typeof (user));
        if (user === null) {
          return UserRepository.signUp(body);
        }
        buildError(userAlreadyExists);
      });
  }

  findAllUsers(queryParams) {
    return UserRepository.findAll(queryParams);
  }

  findUserById(id) {
    return UserRepository.findById(id)
      .catch((err) => {
        return buildError(userNotFound);
      });
  }

  verifyUserByEmail(email) {
    return UserRepository.findUserByEmail(email)
      .then((user) => {
        if (user === null) {
          return buildError(userNotFound)
        }
      })
      .catch(() => {
        return buildError(userNotFound);
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

  removeUserById(id, email) {
    return this.findUserById(id)
      .then((user) => {
        console.log(email);
        console.log(user);
        if (email === user.email) {
          return UserRepository.removeById(id);
        }
        return buildError(unableToMatchEmail);
      });
  }

  changePasswordByEmail(email, newPassword) {
    return this.patchUserByEmail(email, { "password": newPassword });
  }
}

module.exports = new UserService();