const UserModel = require('../model/UserModel');

class UserRepository {
    constructor() {}

    signUp(body) {
      return UserModel.create(body);
    }

    findAll() {
      return UserModel.findAll();
    }
  
    findById(id) {
      return UserService.findOne();
    }
  
    patchById(id) {
      return UserService.patchUser(id);
    }
  
    removeById(id) {
      return UserService.removeUser(id);
    }
}
  
module.exports = new UserRepository();