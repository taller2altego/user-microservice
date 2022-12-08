// modules
const router = require('express').Router();

// controllers
// const validateUser = require('../controller/users/UserValidate');
// const oauthValidate = require('../controller/users/OauthValidate');
// const validateDriver = require('../controller/driver/DriverValidate');
const user = require('../controller/users/UserController');
const driverController = require('../controller/driver/DriverController');

// utils
const { parseRole } = require('../utils/parsing');
const restrictToAdmin = require('../utils/restrictToAdmin');
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

  app.use('/users', router);

  router.get('/login/oauth', logInput, user.oauthLogin, handlerResponse);
  router.post('/oauth', logInput, parseRole, user.signUp, handlerResponse);

  router.post('/', logInput, restrictToAdmin('isSuperadmin'), parseRole, user.signUp, handlerResponse);
  router.post('/:userId/driver', logInput, driverController.associateDriverToUser, handlerResponse);
  router.post('/verifyUserByEmail', logInput, user.verifyUserByEmail, handlerResponse);
  router.post('/changePassword', logInput, user.changePasswordByEmail, handlerResponse);

  router.get('/login', logInput, user.login, handlerResponse);
  router.get('/', logInput, restrictToAdmin('isAdmin'), user.findAllUsers, handlerResponse);
  router.get('/:id', logInput, user.findUserById, handlerResponse);

  router.patch('/', logInput, user.patchUserByEmail, handlerResponse);
  router.patch('/:id/location', logInput, user.patchDefaultLocationByUserId, handlerResponse);
  router.patch('/:id', logInput, user.patchUserById, handlerResponse);
};
