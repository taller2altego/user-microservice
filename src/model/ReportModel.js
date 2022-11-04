const { Model, DataTypes } = require('sequelize');

const sequelizeInstance = require('../sequelize').getSequelizeInstance();

class Reports extends Model { }

Reports.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  driverId: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, { tableName: 'Reports', timestamps: false, sequelize: getSequelizeInstance() });

/**
 * Function to retrive the sequelize instance.
 * It's being kept separate for testing purposes.
 */
function getSequelizeInstance() {
  return sequelizeInstance;
}

module.exports = Reports;