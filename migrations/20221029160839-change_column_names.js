'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('Drivers', 'licensePlate', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('Drivers', 'license_plate', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    });

    await queryInterface.removeColumn('Drivers', 'userId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('Drivers', 'user_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
