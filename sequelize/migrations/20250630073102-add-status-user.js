'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn(
      'users',
      'status',
      {
        type: Sequelize.ENUM("active", "inactive"),
        before: "email",
        after: "invalid_password_time"
      },
    )
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.removeColumn(
        'users',
        'status',
    )
  }
};
