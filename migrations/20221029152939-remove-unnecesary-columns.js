'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.removeColumn('Users', 'createdAt');
     await queryInterface.removeColumn('Users', 'updatedAt');
     await queryInterface.removeColumn('Users', 'asd');
     await queryInterface.removeColumn('Users', 'lastName');
     await queryInterface.removeColumn('Users', 'firstName');

     await queryInterface.removeColumn('Drivers', 'createdAt');
     await queryInterface.removeColumn('Drivers', 'updatedAt');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
