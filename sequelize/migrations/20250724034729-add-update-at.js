'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'updated_at',
      {
        type: Sequelize.DATE,
        after: 'created_at',
      },
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'users',
      'updated_at',
    )
  }
};
