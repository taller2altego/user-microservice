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
    await queryInterface.changeColumn('Drivers', 'license', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Drivers', 'userId', {
      type: Sequelize.DataTypes.INTEGER
    });
    await queryInterface.addColumn('Drivers', 'model', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Drivers', 'licensePlate', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('Drivers', 'score', {
      type: Sequelize.DataTypes.JSON,
      defaultValue: {
        numberOfScores: 0,
        totalScore: 0
      },
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Drivers');
  }
};
