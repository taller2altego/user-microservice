const UserService = require('../../service/UserService');

class UserController {
    async signup(req, res, next) {
      const token = await UserService.signup(req.body.username, req.body.password)
        .catch((err) => {
          if (err.statusCode === undefined) {
            res.customResponse = { statusCode: 500, message: 'Unexpected error' };
          } else {
            res.customResponse = { statusCode: err.statusCode, message: err.message };
          }
          next();
        });
      res.customResponse = { statusCode: 200, token };
      next();
    }
}
  
module.exports = new UserController();