const UserService = require('../service/UserService');

class UserController {
  signUp(req, res, next) {
    return UserService.signUp(req.body)
      .then(user => {
        res.customResponse = { statusCode: 201, id: user.id, username: user.username };
        next();
      })
      .catch((err) => {
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }

  async findAllUsers(req, res, next) {
    return UserService.findAllUsers()
      .then(users => {
        res.customResponse = { statusCode: 200, data: users };
        next();
      });
  }

  async findUserById(req, res, next) {
    console.log(req);
    return UserService.findUserById(req.params.id)
      .then(user => {
        console.log(user);
        res.customResponse = { statusCode: 200, data: user };
        next();
      })
      .catch((err) => {
        console.log(err);
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }

  async patchUserById(req, res, next) {
    return UserService.patchUserById(req.params.id, req.body)
      .then(() => {
        res.customResponse = { statusCode: 201 };
        next();
      })
      .catch((err) => {
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }

  async removeUserById(req, res, next) {
    return UserService.removeUserById(req.params.id)
      .then(() => {
        res.customResponse = { statusCode: 204 };
        next();
      })
      .catch((err) => {
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }
}

module.exports = new UserController();