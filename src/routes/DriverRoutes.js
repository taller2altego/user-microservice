// controllers
const driverController = require('../controller/driver/DriverController');

// utils
const logger = require('../../winston');

// modules
const router = require('express').Router();

module.exports = app => {

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  const logInput = (req, res, next) => {
    logger.info(JSON.stringify(req.body, undefined, 2));
    logger.info(JSON.stringify(req.query, undefined, 2));
    next();
  }

  app.use('/drivers', router);

  router.get('/', logInput, driverController.findAllDrivers, handlerResponse);
  router.get('/:id', logInput, driverController.findDriverById, handlerResponse);
  router.patch('/:id', logInput, driverController.patchDriverById, handlerResponse);
  router.delete('/:id', logInput, driverController.removeDriverById, handlerResponse);
};