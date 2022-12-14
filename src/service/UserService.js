const UserRepository = require('../repository/UserRepository');
const {
  UserAlreadyExists,
  UserNotFound,
  WrongPassword,
  BlockedAccount,
  NotEnoughFunds
} = require('../utils/errors');
const { parseRoleId } = require('../utils/parsing');

class UserService {
  async signUp(body) {
    return UserRepository.findUserByEmail(body.email)
      .then(user => {
        if (user === null) {
          return UserRepository.signUp(body)
            .then(res => parseRoleId(res));
        }
        throw new UserAlreadyExists();
      });
  }

  async oauthLogin(queryParams) {
    return UserRepository
      .findUserByEmail(queryParams.email)
      .then(user => {
        if (user === null) {
          throw new UserNotFound();
        } else if (user.isBlocked === true) {
          throw new BlockedAccount();
        } else {
          const isSuperadmin = user.roleId === 1;
          const isAdmin = user.roleId === 1 || user.roleId === 2;
          const response = { ...user, isAdmin, isSuperadmin };
          delete response.roleId;
          return response;
        }
      });
  }

  async login(queryParams) {
    return UserRepository
      .findUserByEmail(queryParams.email)
      .then(user => {
        if (user === null) {
          throw new UserNotFound();
        } else if (user.password !== queryParams.password) {
          throw new WrongPassword();
        } else if (user.isBlocked === true) {
          throw new BlockedAccount();
        } else {
          const isSuperadmin = user.roleId === 1;
          const isAdmin = user.roleId === 1 || user.roleId === 2;
          const response = { ...user, isAdmin, isSuperadmin };
          delete response.roleId;
          return response;
        }
      });
  }

  findAllUsers(queryParams) {
    return UserRepository
      .findAll(queryParams)
      .then(data => data.map(row => parseRoleId(row)));
  }

  findUserById(id) {
    return UserRepository.findById(id)
      .then(response => {
        if (response === null) {
          throw new UserNotFound();
        }
        return parseRoleId(response);
      })
      .catch(() => {
        throw new UserNotFound();
      });
  }

  verifyUserByEmail(email) {
    return UserRepository
      .findUserByEmail(email)
      .then(user => {
        if (user === null) {
          throw new UserNotFound();
        }
        return undefined;
      })
      .catch(() => {
        throw new UserNotFound();
      });
  }

  patchUserById(id, body) {
    if (body.score) {
      return this.findUserById(id).then(user => {
        const oldNumberOfScores = user.numberOfScores;
        const oldtotalScore = user.totalScore * oldNumberOfScores;
        const newScore = {
          numberOfScores: oldNumberOfScores + 1,
          totalScore: oldtotalScore + body.score
        };
        return UserRepository.patchById(id, newScore);
      });
    }
    if (body.isTransaction) {
      return this.findUserById(id).then(user => {
        if (body.withdrawFunds) {
          if (body.balance > user.balance) {
            throw new NotEnoughFunds();
          }
          return UserRepository.patchById(id, { balance: user.balance - body.balance });
        }
        return UserRepository.patchById(id, { balance: user.balance + body.balance });
      });
    }
    return this.findUserById(id)
      .then(() => UserRepository.patchById(id, body));
  }

  patchUserByEmail(email, body) {
    return this.verifyUserByEmail(email)
      .then(() => UserRepository.patchByEmail(email, body));
  }

  patchDefaultLocationByUserId(userId, body) {
    return UserRepository.patchById(userId, body);
  }

  changePasswordByEmail(email, newPassword) {
    return this.patchUserByEmail(email, {
      password: newPassword
    });
  }
}

module.exports = new UserService();
