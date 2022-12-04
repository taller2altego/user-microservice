const { errors } = require('config');
const UserRepository = require('../repository/UserRepository');
const DriverRepository = require('../repository/DriverRepository');

const ReportRepository = require('../repository/ReportRepository');

const { userNotFound, driverNotFound } = errors;

const buildError = objectMessage => {
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
    await UserRepository.patchById(userId, { roleId: 4 });
    return DriverRepository.create({ ...body, userId });
  }

  findAllDrivers() {
    return DriverRepository.findAll();
  }

  findDriverById(driverId) {
    return DriverRepository.findById(driverId)
      .then(driver => {
        if (driver === null) {
          buildError(driverNotFound);
        }
        return driver;
      });
  }

  findAllReportsByDriverId(driverId) {
    return ReportRepository.findAllByDriverId(driverId);
  }

  patchDriverById(driverId, body) {
    if (body.score) {
      return this.findDriverById(driverId).then(driver => {
        const oldNumberOfScores = driver.numberOfScores;
        const oldtotalScore = driver.totalScore * oldNumberOfScores;
        const newScore = {
          numberOfScores: oldNumberOfScores + 1,
          totalScore: oldtotalScore + body.score
        };
        return DriverRepository.patchById(driverId, newScore);
      });
    }
    return this.findDriverById(driverId).then(() => DriverRepository.patchById(driverId, body));
  }

  removeDriverById(driverId) {
    return this.findDriverById(driverId).then(() => DriverRepository.removeById(driverId));
  }
}

module.exports = new DriverService();
