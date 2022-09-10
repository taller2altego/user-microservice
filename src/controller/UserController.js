const UserService = require('../service/UserService');

class UserController {
  async signUp(req, res, next) {
    return UserService.signUp(req.body)
      .then(({ token }) => {
        res.customResponse = { statusCode: 201 };
        next();
      });
    // .catch((err) => {
    //   if (err.statusCode === undefined) {
    //     res.customResponse = { statusCode: 500, message: 'Unexpected error' };
    //   } else {
    //     res.customResponse = { statusCode: err.statusCode, message: err.message };
    //   }
    //   next();
    // });
  }

  async findAllUsers(req, res, next) {
    return UserService.findAllUsers()
      .then(({ users }) => {
        res.customResponse = { statusCode: 200, data: users };
        next();
      });
  }

  async findUserById(req, res, next) {
    return UserService.findUserById(req.query.id)
      .then(({ user }) => {
        res.customResponse = { statusCode: 200, data: user };
      });
  }

  async patchUserById(req, res, next) {
    return UserService.findUserById(req.query.id)
      .then(({ user }) => { });
  }

  async removeUserById(req, res, next) {
    return UserService.removeUserById()
      .then(({ }) => {

      });
  }
}

module.exports = new UserController();