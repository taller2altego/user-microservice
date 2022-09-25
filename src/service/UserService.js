const UserRepository = require('../repository/UserRepository');
const { errors } = require("config");
const logger = require('../../winston');
const {
  userNotFound,
  wrongPassword,
  userAlreadyExists,
  unableToMatchPasswords,
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

  async login(queryParams) {
    console.log(queryParams);
    return this
      .findAllUsers(queryParams)
      .then(response => {
        console.log(response);
        if (!response.length) {
          return buildError(userNotFound);
        } else if (response[0].password != queryParams.password) {
          return buildError(wrongPassword);
        } else {
          return response;
        }
      })
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

  changePasswordByEmail(email, newPassword, newPasswordAgain) {
    if (newPassword === newPasswordAgain) {
      return this.patchUserByEmail(email, { "password": newPassword });
    }
    return buildError(unableToMatchPasswords);
  }
}

module.exports = new UserService();