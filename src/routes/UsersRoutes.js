module.exports = app => {
  const user = require('../controller/UserController');
  const router = require('express').Router();

  const handlerResponse = (req, res) => {
    const { statusCode, ...otherFields } = res.customResponse;
    res.status(statusCode).send(otherFields);
  };

  app.use('/users', router);
  router.post('/', user.signUp, handlerResponse);
  // router.patch('/:id', user.editUser, handlerResponse);
  // router.get('/:id', user.getUserById, handlerResponse);
  // router.get('/', user.getUsers, handlerResponse);
  // router.delete('/:id', user.deleteUser, handlerResponse);
};