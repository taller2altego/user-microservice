const { Model, DataTypes } = require('sequelize');

const sequelizeInstance = require('../sequelize').getSequelizeInstance();

/**
 * Function to retrive the sequelize instance.
 * It's being kept separate for testing purposes.
 */
function getSequelizeInstance() {
  return sequelizeInstance;
}

class Comment extends Model { }

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isUserComment: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { tableName: 'Comments', timestamps: false, sequelize: getSequelizeInstance() });

module.exports = Comment;
