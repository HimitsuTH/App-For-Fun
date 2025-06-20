'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(255),
          unique: true,
        },
        invalid_password_time: {
          type: Sequelize.INTEGER(1),
        },
        created_at: {
          type: Sequelize.DATE,
        },
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
