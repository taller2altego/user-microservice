const UserRepository = require('../repository/UserRepository');
const { errors } = require("config");
const {
  userNotFound,
  userAlreadyExists,
  missingCredentials,
} = errors;

const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string" }
  },
  required: ["username", "password"],
  additionalProperties: false
}

const buildError = (objectMessage) => {
  const err = new Error();
  err.statusCode = objectMessage.statusCode;
  err.message = objectMessage.message;
  throw err;
};

class UserService {
  async signUp(body) {
    const valid = ajv.validate(schema, body)
    if (!valid) {
      return buildError(missingCredentials);
    }

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

  removeUserById(id) {
    return this.findUserById(id)
      .then(() => {
        return UserRepository.removeById(id);
      });
  }
}

module.exports = new UserService();