// controllers
const validateUser = require('../controller/users/UserValidate');
const validateDriver = require('../controller/driver/DriverValidate');
const user = require('../controller/users/UserController');
const driverController = require('../controller/driver/DriverController');

// utils
const { parseRole } = require('../utils/parsing');
const restrictToAdmin = require('../utils/restrictToAdmin');
const requestValidator = require('../utils/requestValidator');
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

  app.use('/users', router);
  router.get('/login', logInput, user.login, handlerResponse);
  router.post('/', logInput, restrictToAdmin('isSuperadmin'), validateUser, parseRole, user.signUp, handlerResponse);
  router.get('/', logInput, restrictToAdmin('isAdmin'), user.findAllUsers, handlerResponse);
  router.get('/:id', logInput, requestValidator('id'), user.findUserById, handlerResponse);
  router.patch('/:id', logInput, requestValidator('id'), user.patchUserById, handlerResponse);
  router.delete('/:id', logInput, requestValidator('id'), user.removeUserById, handlerResponse); // chequear

  // a revisar
  router.post('/verifyUserByEmail', user.verifyUserByEmail, handlerResponse); // no tiene que ser un post, se esta buscando algo. Endpoint innecesario, está el find de users.
  router.post('/:id/score', user.addUserScoreById, handlerResponse); // no es un post, se esta modificando un campo. Endpoint innecesario.
  router.post('/changePassword', user.changePasswordByEmail, handlerResponse); // endpoint innecesario, está el put de users.
  router.post('/:userId/driver/:driverId/score', driverController.addDriverScoreById, handlerResponse); // endpoint innecesario, es un put.

  router.post('/:userId/driver', validateDriver, driverController.associateDriverToUser, handlerResponse);
};