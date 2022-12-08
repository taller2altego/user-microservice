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
    const reportsInclude = [{
      model: ReportModel, as: 'reports', required: false, attributes: []
    }];
    const driverInclude = [{
      model: DriverModel, as: 'drivers', required: false, include: reportsInclude
    }];
    const order = [[Sequelize.col('User.id'), 'ASC']];
    const includedAttributes = [[Sequelize.fn('COUNT', Sequelize.col('drivers.reports.id')), 'reportsCount']];

    const params = {
      attributes: { include: includedAttributes },
      order,
      include: driverInclude,
      group: [Sequelize.col('User.id'), Sequelize.col('drivers.id')]
    };

    if (email) {
      params.where = { email };
    }

    return UserModel
      .findAll(params)
      .then(users => users.map(user => {
        const data = user.toJSON();
        const scores = data.numberOfScores;
        const sumatory = data.totalScore;
        const totalScore = scores !== 0 ? sumatory / scores : 0;
        return {
          ...data,
          totalScore
        };
      }));
  }

  findById(id) {
    const reportInclude = [{
      model: ReportModel, as: 'reports', required: false, attributes: []
    }];
    const driverInclude = [{
      model: DriverModel, as: 'drivers', required: false, include: reportInclude
    }];
    const includedAttributes = { include: [[Sequelize.fn('COUNT', Sequelize.col('drivers.reports.id')), 'reportsCount']] };

    const params = {
      attributes: includedAttributes,
      include: driverInclude,
      group: [Sequelize.col('User.id'), Sequelize.col('drivers.id')]
    };

    return UserModel
      .findByPk(id, params)
      .then(user => (user ? user.toJSON() : null))
      .then(user => {
        if (user) {
          const { drivers, ...userData } = user;
          const scores = user.numberOfScores;
          const sumatory = user.totalScore;
          const totalScore = scores !== 0 ? sumatory / scores : 0;
          return {
            ...userData,
            isDriver: user.drivers.length > 0,
            driverId: user.drivers.length ? user.drivers[0].id : undefined,
            totalScore
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
}

module.exports = new UserRepository();
