const DriverModel = require('../model/DriverModel');
const UserModel = require('../model/UserModel');

class DriverRepository {
  create(body) {
    return DriverModel
      .create(body)
      .then(driver => driver.toJSON());
  }

  findAll() {
    return DriverModel
      .findAll()
      .then(drivers => drivers.map(driver => {
        const data = driver.toJSON();
        const totalScore = data.numberOfScores !== 0 ? data.totalScore / data.numberOfScores : 0;
        return {
          ...data,
          totalScore
        };
      }));
  }

  findById(driverId) {
    const params = {
      include: [
        { model: UserModel, as: 'user', required: false }
      ],
      where: { id: driverId }
    };

    return DriverModel
      .findOne(params)
      .then(driver => (driver ? driver.toJSON() : null))
      .then(driver => {
        const scores = driver.numberOfScores;
        const sumatory = driver.totalScore;
        const totalScore = scores !== 0 ? sumatory / scores : 0;
        return {
          ...driver,
          totalScore,
          user: { name: driver.user.name, lastname: driver.user.lastname }
        };
      });
  }

  patchById(driverId, body) {
    return DriverModel
      .update(body, { where: { id: driverId } })
      .then(() => body);
  }

  removeById(driverId) {
    return DriverModel
      .destroy({ where: { id: driverId } });
  }
}

module.exports = new DriverRepository();
