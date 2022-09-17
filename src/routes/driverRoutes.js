const validateDriver = require('../controller/driver/driverController');
const driverController = require('../controller/driver/driverController');

const router = require('express').Router();

module.exports = app => {

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/users/:id/driver', router);
  router.post('/', validateDriver, driverController.associateDriverToUser, handlerResponse);
  router.patch('/:id', driverController.patchDriver, handlerResponse);
  router.get('/:id', driverController.findDriverById, handlerResponse);
  router.get('/', driverController.findAllDrivers, handlerResponse);
  router.delete('/:id', driverController.removeDriverById, handlerResponse);
};