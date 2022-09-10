const UserModel = require('../model/UserModel');

class UserRepository {
    constructor() {}

    async signUp(username, password){
      return UserModel.findAll({
        
      });
    }
}
  
module.exports = new UserRepository();