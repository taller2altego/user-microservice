const UserRepository = require('../repository/UserRepository');
const {
  UserAlreadyExists,
  UserNotFound,
  WrongPassword,
  UnableToMatchEmail,
  BlockedAccount
} = require('../utils/errors');
const { parseRoleId } = require('../utils/parsing');

class UserService {
  async signUp(body) {
    return UserRepository.findUserByEmail(body.email)
      .then(user => {
        if (user === null) {
          return UserRepository.signUp(body)
            .then(res => {
              return parseRoleId(res);
            });
        }
        throw new UserAlreadyExists();
      });
  }

  async login(queryParams) {
    return UserRepository
      .findUserByEmail(queryParams.email)
      .then(user => {
        if (user === null) {
          throw new UserNotFound();
        } else if (user.password != queryParams.password) {
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
      .then((user) => {
        if (user === null) {
          throw new UserNotFound();
        }
      })
      .catch(() => {
        throw new UserNotFound();
      });
  }

  patchUserById(id, body) {
    if (body.score) {
      return this.findUserById(id).then((user) => {
        const oldNumberOfScores = user.numberOfScores;
        const oldtotalScore = user.totalScore;
        const newScore = {
          numberOfScores: oldNumberOfScores + 1,
          totalScore: (oldtotalScore * oldNumberOfScores + body.score) / (oldNumberOfScores + 1)
        };
        return UserRepository.patchById(id, newScore);
      });
    }
    return this.findUserById(id)
      .then(() => {
        return UserRepository.patchById(id, body);
      });
  }

  removeUserById(id, email) {
    return this.findUserById(id)
      .then((user) => {
        if (email === user.email) {
          return UserRepository.removeById(id);
        }
        throw new UnableToMatchEmail();
      });
  }

  changePasswordByEmail(email, newPassword) {
    return this.patchUserByEmail(email, {
      password: newPassword,
    });
  }
}

module.exports = new UserService();