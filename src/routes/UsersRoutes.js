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
  router.patch('/', logInput, user.patchUserByEmail, handlerResponse);
  router.patch('/:id', logInput, requestValidator('id'), user.patchUserById, handlerResponse);
  router.delete('/:id', logInput, requestValidator('id'), user.removeUserById, handlerResponse);

  router.post('/:userId/driver', validateDriver, driverController.associateDriverToUser, handlerResponse);
};