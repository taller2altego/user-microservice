module.exports = app => {
  const user = require('../controller/UserController');
  const router = require('express').Router();

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/users', router);
  router.post('/', user.signUp, handlerResponse);
  router.patch('/:id', user.patchUserById, handlerResponse);
  router.get('/:id', user.findUserById, handlerResponse);
  router.get('/', user.findAllUsers, handlerResponse);
  router.delete('/:id', user.removeUserById, handlerResponse);
  
  router.post('/reset_password', user.changePasswordByUsername, handlerResponse);
};