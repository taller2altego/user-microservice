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
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
    type: DataTypes.STRING
  },
  numberOfScores: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  totalScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    required: true,
    defaultValue: new Date()
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, { tableName: 'Users', timestamps: false, sequelize: getSequelizeInstance() });

User.hasMany(DriverModel, { as: 'isDriver' });

/**
 * Function to retrive the sequelize instance.
 * It's being kept separate for testing purposes.
 */
function getSequelizeInstance() {
  return sequelizeInstance;
}

module.exports = User;