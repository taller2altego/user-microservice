const { Model, DataTypes } = require('sequelize');
const sequelizeInstance = require('../sequelize').getSequelizeInstance();

const DriverModel = require('./DriverModel');

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.JSON,
    defaultValue: {
      numberOfScores: 0,
      totalScore: 0
    },
    allowNull: true
  }
}, { tableName: 'user', timestamps: false, sequelize: getSequelizeInstance() });

User.hasMany(DriverModel, { as: 'isDriver' });

/**
 * Function to retrive the sequelize instance.
 * It's being kept separate for testing purposes.
 */
function getSequelizeInstance() {
  return sequelizeInstance;
}

module.exports = User;