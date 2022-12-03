const logger = require('../../../winston');
const UserService = require('../../service/UserService');

class UserController {
  signUp(req, res, next) {
    return UserService.signUp(req.body)
      .then(user => {
        const { password, ...response } = user;
        res.customResponse = { statusCode: 201, ...response };
        next();
      })
      .catch((err) => {
        logger.error(JSON.stringify(err));
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }

  oauthLogin(req, res, next) {
    return UserService.oauthLogin(req.query)
      .then(({ password, ...data }) => {
        res.customResponse = { statusCode: 200, data };
        next();
      })
      .catch(err => {
        logger.error(JSON.stringify(err));
        res.customResponse = { statusCode: err.statusCode, message: err.message };
        next();
      });
  }

  login(req, res, next) {
    logger.info(JSON.stringify(req.query, undefined, 2));
    return UserService.login(req.query)
      .then(({ password, ...data }) => {
        res.customResponse = { statusCode: 200, data };
        next();
      })
      .catch(err => {
        logger.error(JSON.stringify(err));
        res.customResponse = { statusCode: err.statusCode, message: err.message };
        next();
      });
  }

  async findAllUsers(req, res, next) {
    return UserService.findAllUsers(req.query)
      .then(users => {
        const data = users.map(({ password, ...r }) => r);
        res.customResponse = { statusCode: 200, data };
        next();
      })
      .catch(err => {
        logger.error(JSON.stringify(err));
        res.customResponse = { statusCode: err.statusCode, message: err.message };
        next();
      });
  }

  async findUserById(req, res, next) {
    return UserService.findUserById(req.params.id)
      .then(user => {
        const { password, ...response } = user;
        res.customResponse = { statusCode: 200, ...response };
        next();
      })
      .catch((err) => {
        logger.error(JSON.stringify(err));
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }

  async verifyUserByEmail(req, res, next) {
    return UserService.verifyUserByEmail(req.body.email)
      .then(() => {
        res.customResponse = { statusCode: 200 };
        next();
      })
      .catch((err) => {
        logger.error(JSON.stringify(err));
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
        logger.error(JSON.stringify(err));
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }

  async patchUserByEmail(req, res, next) {
    const email = req.body.email;
    delete req.body[email];
    return UserService.patchUserByEmail(email, req.body)
      .then(() => {
        res.customResponse = { statusCode: 201 };
        next();
      })
      .catch((err) => {
        logger.error(JSON.stringify(err));
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }

  async patchDefaultLocationByUserId(req, res, next) {
    const userId = req.params.id;
    const defaultAddress = req.body.defaultAddress;
    return UserService.patchDefaultLocationByUserId(userId, defaultAddress)
      .then(() => {
        res.customResponse = { statusCode: 204 };
        next();
      })
      .catch((err) => {
        logger.error(JSON.stringify(err));
        if (err.statusCode === undefined) {
          res.customResponse = { statusCode: 500, message: 'Unexpected Error' };
        } else {
          res.customResponse = { statusCode: err.statusCode, message: err.message };
        }
        next();
      });
  }

  async changePasswordByEmail(req, res, next) {
    return UserService.changePasswordByEmail(req.body.email, req.body.newPassword)
      .then(() => {
        res.customResponse = { statusCode: 204 };
        next();
      })
      .catch((err) => {
        logger.error(JSON.stringify(err));
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