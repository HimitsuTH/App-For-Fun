'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('categories', 'budget_limit', {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true,
      defaultValue: null,
      after: 'description', // วางหลัง description (MySQL)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'budget_limit');
  }
};