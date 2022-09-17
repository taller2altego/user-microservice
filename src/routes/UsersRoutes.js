const validateUser = require('../controller/users/UserValidate');
const user = require('../controller/users/UserController');

const router = require('express').Router();

module.exports = app => {

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/users', router);
  router.post('/', validateUser, user.signUp, handlerResponse);
  router.patch('/:id', user.patchUserById, handlerResponse);
  router.get('/:id', user.findUserById, handlerResponse);
  router.get('/', user.findAllUsers, handlerResponse);
  router.delete('/:id', user.removeUserById, handlerResponse);

  //router.post('/reset_password', user.changePasswordByEmail, handlerResponse);
};