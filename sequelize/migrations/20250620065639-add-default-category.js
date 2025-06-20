'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'category',
      [
        {
          id: 1,
          name: "Electronic",
          created_at: new Date(),
        },
        {
          id: 2,
          name: "Food",
          created_at: new Date(),
        },
        {
          id: 3,
          name: "Tools",
          created_at: new Date(),
        },
        {
          id: 4,
          name: "Salary",
          created_at: new Date(),
        },
      ],
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'category',
      {
        id: [1, 2, 3, 4],
      },
    )
  }
};
