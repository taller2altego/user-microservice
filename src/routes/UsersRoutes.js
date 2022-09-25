const validateUser = require('../controller/users/UserValidate');
const validateDriver = require('../controller/driver/DriverValidate');
const user = require('../controller/users/UserController');
const driverController = require('../controller/driver/DriverController');

const router = require('express').Router();

module.exports = app => {

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/users', router);
  router.get('/login', user.login, handlerResponse);
  router.post('/', validateUser, user.signUp, handlerResponse);
  router.patch('/:id', user.patchUserById, handlerResponse);
  router.get('/:id', user.findUserById, handlerResponse);

  router.get('/', user.findAllUsers, handlerResponse);
  router.delete('/:id', user.removeUserById, handlerResponse);
  router.post('/change_password', user.changePasswordByEmail, handlerResponse);
  router.post('/verifyUserByEmail', user.verifyUserByEmail, handlerResponse);


  router.post('/:userId/driver', validateDriver, driverController.associateDriverToUser, handlerResponse);
  router.get('/:userId/driver', driverController.findAllDrivers, handlerResponse);
  router.get('/:userId/driver/:driverId', driverController.findDriverById, handlerResponse);
  router.patch('/:userId/driver/:driverId', driverController.patchDriverById, handlerResponse);
  router.delete('/:userId/driver/:driverId', driverController.removeDriverById, handlerResponse);

};