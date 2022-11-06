const logger = require('../../../winston');
const DriverService = require('../../service/DriverService');
const handlerError = require('../../utils/handlerError');

class DriverController {
  associateDriverToUser(req, res, next) {
    return DriverService.associateDriverToUser(req.body, req.params.userId)
      .then(user => {
        const { password, ...response } = user;
        res.customResponse = { statusCode: 201, ...response };
        next();
      })
      .catch(err => {
        res.customResponse = handlerError(err);
        next();
      });
  }

  async findAllDrivers(req, res, next) {
    return DriverService.findAllDrivers()
      .then(users => {
        const data = users.map(({ password, ...r }) => r);
        res.customResponse = { statusCode: 200, data };
        next();
      })
      .catch(err => {
        res.customResponse = handlerError(err);
        next();
      });
  }

  async findDriverById(req, res, next) {
    return DriverService.findDriverById(req.params.userId, req.params.driverId)
      .then(driver => {
        res.customResponse = { statusCode: 200, ...driver };
        next();
      })
      .catch(err => {
        logger.error(err);
        res.customResponse = handlerError(err);
        next();
      });
  }

  async patchDriverById(req, res, next) {
    return DriverService.patchDriverById(req.params.userId, req.params.driverId, req.body)
      .then(() => {
        res.customResponse = { statusCode: 201 };
        next();
      })
      .catch(err => {
        res.customResponse = handlerError(err);
        next();
      });
  }

  async removeDriverById(req, res, next) {
    return DriverService.removeDriverById(req.params.userId, req.params.driverId)
      .then(() => {
        res.customResponse = { statusCode: 204 };
        next();
      })
      .catch(err => {
        res.customResponse = handlerError(err);
        next();
      });
  }

  async addDriverScoreById(req, res, next) {
    return DriverService.addDriverScoreById(req.params.userId, req.params.driverId, req.body.score)
    .then(() => {
      res.customResponse = { statusCode: 204 };
      next();
    })
    .catch(err => {
      res.customResponse = handlerError(err);
      next();
    });
  }
}

module.exports = new DriverController();