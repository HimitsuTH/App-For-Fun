'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'expenses',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id',
          },
        },
        name: {
          type: Sequelize.STRING(255),
        },
        amount: {
          type: Sequelize.DECIMAL(18, 2),
        },
        type: {
          type: Sequelize.ENUM('INCOME','EXPENSE'),
        },
        description: {
          type: Sequelize.STRING(255),
        },
        date: {
          type: Sequelize.DATE,
        },
        created_at: {
          type: Sequelize.DATE,
        },
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('expenses')
  }
};
