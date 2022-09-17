const DriverModel = require('../model/DriverModel');

class DriverRepository {
  constructor() { }

  create(body) {
    return DriverModel
      .create(body)
      .then(user => user.toJSON());
  }

  findAll() {
    return DriverModel
      .findAll()
      .then(users => users.map(user => user.toJSON()));
  }

  findById(id) {
    return DriverModel
      .findByPk(id)
      .then(user => user.toJSON());
  }

  patchById(id, body) {
    return DriverModel.update(body, { where: { id } });
  }

  removeById(id) {
    return DriverModel.destroy({ where: { id } });
  }
}

module.exports = new DriverRepository();