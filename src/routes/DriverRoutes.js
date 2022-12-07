// modules
const router = require('express').Router();

// controllers
const driverController = require('../controller/driver/DriverController');

// utils
const logger = require('../../winston');

module.exports = app => {
  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    logger.info(`response: ${JSON.stringify(otherFields, undefined, 2)}`);
    res.status(statusCode).send(otherFields);
  };

  const logInput = (req, res, next) => {
    if (req.query) {
      logger.info(JSON.stringify(req.query, undefined, 2));
      logger.info(`query: ${JSON.stringify(req.query, undefined, 2)}`);
    }

    if (req.params) {
      logger.info(`params: ${JSON.stringify(req.params, undefined, 2)}`);
    }

    if (req.body) {
      logger.info(`body: ${JSON.stringify(req.body, undefined, 2)}`);
    }
    next();
  };

  app.use('/drivers', router);

  router.get('/', logInput, driverController.findAllDrivers, handlerResponse);
  router.get('/:id', logInput, driverController.findDriverById, handlerResponse);
  router.get('/:id/reports', logInput, driverController.findAllReportsByDriverId, handlerResponse);

  router.patch('/:id', logInput, driverController.patchDriverById, handlerResponse);
  router.delete('/:id', logInput, driverController.removeDriverById, handlerResponse);
};
