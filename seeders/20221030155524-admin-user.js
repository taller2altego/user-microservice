'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const roles = [
      { name: 'superadmin', description: 'superadmin' },
      { name: 'admin', description: 'admin' },
      { name: 'user', description: 'user' },
      { name: 'driver', description: 'driver' }
    ];

    await queryInterface.bulkInsert('Roles', roles);

    await queryInterface.bulkInsert('Users', [{
      name: 'superadmin',
      lastname: 'superadmin',
      phone_number: 123,
      email: 'superadmin@fiuber.com',
      password: '1234',
      role_id: 1,
      number_of_scores: 0,
      total_score: 0
    }]);

    await queryInterface.bulkInsert('Users', [{
      name: 'admin',
      lastname: 'admin',
      phone_number: 123,
      email: 'admin@fiuber.com',
      password: '1234',
      role_id: 2,
      number_of_scores: 0,
      total_score: 0
    }]);

    await queryInterface.bulkInsert('Users', [{
      name: 'user',
      lastname: 'user',
      phone_number: 123,
      email: 'user@fiuber.com',
      password: '1234',
      role_id: 3,
      number_of_scores: 0,
      total_score: 0
    }]);

    await queryInterface.bulkInsert('Users', [{
      name: 'driver',
      lastname: 'driver',
      phone_number: 123,
      email: 'driver@fiuber.com',
      password: '1234',
      role_id: 4,
      number_of_scores: 0,
      total_score: 0
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
