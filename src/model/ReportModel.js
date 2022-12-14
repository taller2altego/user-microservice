const { Model, DataTypes } = require('sequelize');

const sequelizeInstance = require('../sequelize').getSequelizeInstance();

/**
 * Function to retrive the sequelize instance.
 * It's being kept separate for testing purposes.
 */
function getSequelizeInstance() {
  return sequelizeInstance;
}

class Report extends Model { }

Report.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  driverId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: 'Reports', timestamps: false, sequelize: getSequelizeInstance() });

module.exports = Report;
