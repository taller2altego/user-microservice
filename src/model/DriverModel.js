const { Model, DataTypes } = require('sequelize');
const Report = require('./ReportModel');

const sequelizeInstance = require('../sequelize').getSequelizeInstance();

class Driver extends Model { }

Driver.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  license: {
    type: DataTypes.STRING,
    allowNull: false
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licensePlate: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  }
}, { tableName: 'Drivers', timestamps: false, sequelize: getSequelizeInstance() });

Driver.hasMany(Report, { as: 'reports' });

/**
 * Function to retrive the sequelize instance.
 * It's being kept separate for testing purposes.
 */
function getSequelizeInstance() {
  return sequelizeInstance;
}

module.exports = Driver;
