const { Sequelize } = require('sequelize');
const UserModel = require('../model/UserModel');
const DriverModel = require('../model/DriverModel');
const ReportModel = require('../model/ReportModel');

class UserRepository {
  signUp(body) {
    return UserModel
      .create({ ...body, isBlocked: false })
      .then(user => user.toJSON());
  }

  findAll({ email }) {
    const params = {
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('drivers.reports.id')), 'reportsCount']]
      },
      order: [
        [Sequelize.col('User.id'), 'ASC'],
      ],
      include: [
        {
          model: DriverModel,
          as: 'drivers',
          required: false,
          include: [
            {
              model: ReportModel, as: 'reports', required: false, attributes: []
            }
          ]
        }
      ],
      group: [Sequelize.col('User.id'), Sequelize.col('drivers.id')]
    };

    if (email) {
      params.where = { email };
    }

    return UserModel
      .findAll(params)
      .then(users => users.map(user => user.toJSON()))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  findById(id) {
    const params = {
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('drivers.reports.id')), 'reportsCount']]
      },
      include: [
        {
          model: DriverModel,
          as: 'drivers',
          required: false,
          include: [
            {
              model: ReportModel, as: 'reports', required: false, attributes: []
            }
          ]
        }
      ],
      group: [Sequelize.col('User.id'), Sequelize.col('drivers.id')]
    };

    return UserModel
      .findByPk(id, params)
      .then(user => (user ? user.toJSON() : null))
      .then(user => {
        if (user) {
          const { drivers, ...userData } = user;
          return {
            ...userData,
            isDriver: user.drivers.length > 0,
            driverId: user.drivers.length ? user.drivers[0].id : undefined
          };
        }
        return null;
      });
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

  patchDefaultLocationByUserId(id, body) {
    return UserModel.update(body, { where: { id } });
  }

  removeById(id) {
    return UserModel.destroy({ where: { id } });
  }
}

module.exports = new UserRepository();
