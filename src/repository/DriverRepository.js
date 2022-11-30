const DriverModel = require('../model/DriverModel');

class DriverRepository {
  create(body) {
    return DriverModel
      .create(body)
      .then(driver => driver.toJSON());
  }

  findAll() {
    return DriverModel
      .findAll()
      .then(drivers => drivers.map(driver => driver.toJSON()));
  }

  findById(driverId) {
    return DriverModel
      .findOne({ where: { id: driverId } })
      .then(driver => (driver ? driver.toJSON() : null));
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
