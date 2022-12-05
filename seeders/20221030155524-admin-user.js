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

    const superadminUser = {
      name: 'superadmin',
      lastname: 'superadmin',
      phone_number: 123,
      email: 'superadmin@fiuber.com',
      password: '1234',
      role_id: 1,
      number_of_scores: 0,
      total_score: 0,
      is_blocked: false,
      balance: 0,
      created_at: '2020-10-10'
    };

    const adminUser = {
      name: 'admin',
      lastname: 'admin',
      phone_number: 123,
      email: 'admin@fiuber.com',
      password: '1234',
      role_id: 2,
      number_of_scores: 0,
      total_score: 0,
      is_blocked: false,
      balance: 0,
      created_at: '2020-10-10'
    };

    const user = {
      name: 'user',
      lastname: 'user',
      phone_number: 123,
      email: 'user@fiuber.com',
      password: '1234',
      role_id: 3,
      number_of_scores: 0,
      total_score: 0,
      is_blocked: false,
      balance: 0,
      created_at: '2020-10-10'
    };

    const blockedUser = {
      name: 'user',
      lastname: 'blocked',
      phone_number: 123,
      email: 'blockeduser@fiuber.com',
      password: '1234',
      role_id: 3,
      number_of_scores: 0,
      total_score: 0,
      is_blocked: true,
      balance: 0,
      created_at: '2020-10-10'
    };

    const driver = {
      name: 'driver',
      lastname: 'driver',
      phone_number: 123,
      email: 'driver@fiuber.com',
      password: '1234',
      role_id: 4,
      number_of_scores: 0,
      total_score: 0,
      is_blocked: false,
      balance: 0,
      created_at: '2020-10-10'
    };

    await queryInterface.bulkInsert('Users', [superadminUser, adminUser, user, blockedUser, driver]);

    const isDriver = {
      user_id: 5, 
      license: 'asd', 
      model: 'das', 
      license_plate: 'dsa', 
      number_of_scores: 0,
      total_score: 0,
      balance: 0
    };
    await queryInterface.bulkInsert('Drivers', [isDriver]);

    await queryInterface.bulkInsert('Reports', [
      { id: 1, user_id: 3, driver_id: 1, description: 'denuncia 1' },
      { id: 2, user_id: 3, driver_id: 1, description: 'denuncia 2' },
      { id: 3, user_id: 3, driver_id: 1, description: 'denuncia 3' },
      { id: 4, user_id: 3, driver_id: 1, description: 'denuncia 4' }
    ]);
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
