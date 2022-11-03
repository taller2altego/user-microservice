const UserRepository = require('../repository/UserRepository');
const DriverRepository = require('../repository/DriverRepository');

const { errors } = require("config");
const { userNotFound, driverNotFound } = errors;

const buildError = (objectMessage) => {
  const err = new Error();
  err.statusCode = objectMessage.statusCode;
  err.message = objectMessage.message;
  throw err;
};

class DriverService {
  async associateDriverToUser(body, userId) {
    const user = await UserRepository.findById(userId);
    if (user === null) {
      buildError(userNotFound);
    }
    return DriverRepository.create({ ...body, userId });
  }

  findAllDrivers() {
    return DriverRepository.findAll();
  }

  findDriverById(userId, driverId) {
    return DriverRepository.findById(userId, driverId)
      .then(driver => {
        if (driver === null) {
          buildError(driverNotFound);
        }
        return driver;
      });
  }

  patchDriverById(userId, driverId, body) {
    return this.findDriverById(userId, driverId).then(() => DriverRepository.patchById(driverId, body));
  }

  removeDriverById(userId, driverId) {
    return this.findDriverById(userId, driverId).then(() => DriverRepository.removeById(driverId));
  }

  addDriverScoreById(id, score) {
    return this.findDriverById(userId, driverId)
      .then((user) => {
        const oldNumberOfScores = driver.score.numberOfScores;
        const oldtotalScore = driver.score.totalScore;
        const newScore = {
          numberOfScores: oldNumberOfScores + 1,
          totalScore: (oldtotalScore * oldNumberOfScores + score) / (oldNumberOfScores + 1)
        };
        return DriverRepository.patchDriverById(userId, driverId, {
          score: newScore
        })
      });
  }
}

module.exports = new DriverService();