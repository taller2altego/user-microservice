const validateDriver = require('../controller/driver/DriverValidate');
const driverController = require('../controller/driver/DriverController');

const router = require('express').Router();

module.exports = app => {

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/users/:driverId/driver', router);
  router.post('/', validateDriver, driverController.associateDriverToUser, handlerResponse);
  router.get('/', driverController.findAllDrivers, handlerResponse);
  router.get('/:id', driverController.findDriverById, handlerResponse);
  router.patch('/:id', driverController.patchDriver, handlerResponse);
  router.delete('/:id', driverController.removeDriverById, handlerResponse);
};