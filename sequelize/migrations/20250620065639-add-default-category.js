'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: 1,
          name: "electronic",
          created_at: new Date(),
        },
        {
          id: 2,
          name: "food",
          created_at: new Date(),
        },
        {
          id: 3,
          name: "tools",
          created_at: new Date(),
        },
        {
          id: 4,
          name: "salary",
          created_at: new Date(),
        },
      ],
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'categories',
      {
        id: [1, 2, 3, 4],
      },
    )
  }
};
