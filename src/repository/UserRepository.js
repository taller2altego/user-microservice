const UserModel = require('../model/UserModel');
const DriverModel = require('../model/DriverModel');

class UserRepository {
  constructor() { }

  signUp(body) {
    return UserModel
      .create({ ...body, isBlocked: false })
      .then(user => user.toJSON());
  }

  findAll({ email }) {
    const where = {};
    if (email) {
      where['email'] = email;
    }

    return UserModel
      .findAll({ where })
      .then(users => users.map(user => user.toJSON()));
  }

  findById(id) {
    return UserModel
      .findByPk(id, { include: [{ model: DriverModel, as: 'isDriver', required: false }] })
      .then(user => user ? user.toJSON() : null)
      .then(user => user ? ({ ...user, isDriver: user.isDriver.length > 0 }) : null);
  }

  findUserByEmail(email) {
    return UserModel
      .findOne({ where: { email } })
      .then(user => {
        if (user === null) {
          return user;
        }
        return user.toJSON();
      });
  }

  patchById(id, body) {
    return UserModel.update(body, { where: { id } });
  }

  patchByEmail(email, body) {
    return UserModel.update(body, { where: { email } });
  }

  removeById(id) {
    return UserModel.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();