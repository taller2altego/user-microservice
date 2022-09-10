const { Model, DataTypes } = require('sequelize');

const sequelizeInstance = require('../sequelize').getSequelizeInstance();

class SignUp extends Model { }

SignUp.init({
    userId: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { tableName: 'users', timestamps: false, sequelize: getSequelizeInstance() });

/**
 * Function to retrive the sequelize instance.
 * It's being kept separate for testing purposes.
 */
function getSequelizeInstance() {
  return sequelizeInstance;
}

module.exports = SignUp;