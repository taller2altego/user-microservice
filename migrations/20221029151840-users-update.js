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
    await queryInterface.changeColumn('Users', 'name', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Users', 'lastname', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    });

    await queryInterface.changeColumn('Users', 'phoneNumber', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false
    });

    await queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    });

    await queryInterface.addColumn('Users', 'score', {
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
    await queryInterface.dropTable('Users');
  }
};
