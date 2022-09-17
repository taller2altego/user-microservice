const UserRepository = require('../repository/UserRepository');
const DriverRepository = require('../repository/DriverRepository');

const { errors } = require("config");
const { userNotFound } = errors;

const buildError = (objectMessage) => {
  const err = new Error();
  err.statusCode = objectMessage.statusCode;
  err.message = objectMessage.message;
  throw err;
};

class DriverService {
  async associateDriverToUser(body, driverId) {
    return UserRepository.findById(driverId)
      .then(user => {
        if (user === null) {
          buildError(userNotFound);
        }
        return DriverRepository.create({ ...body, userId: driverId });
      });
  }

  findAllDrivers() {
    return DriverRepository.findAll();
  }

  findDriverById(id) {
    return DriverRepository.findById(id)
      .then(user => {
        if (user === null) {
          buildError(userNotFound);
        }
        return user;
      });
  }

  patchDriverById(id, body) {
    return DriverRepository
      .findDriverById(id)
      .patchById(id, body);
  }

  removeDriverById(id, email) {
    return this.findUserById(id)
      .then((user) => {
        if (email === user.email) {
          return DriverRepository.removeById(id);
        }
        return buildError(unableToMatchEmail);
      });
  }
}

module.exports = new DriverService();