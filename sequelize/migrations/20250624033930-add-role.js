'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable(
      'roles',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
        },
      }
    )

    await queryInterface.addColumn(
      'users',
      'role_id',
      {
        type: Sequelize.INTEGER
      },
    )

    await queryInterface.bulkInsert(
      'roles',
      [
        {
          id: 1,
          name: "admin",
          created_at: new Date(),
        },
        {
          id: 2,
          name: "normal",
          created_at: new Date(),
        },
      ],
    )



  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'roles',
      {
        id: [1, 2],
      },
    )
    await queryInterface.dropTable('roles')
    await queryInterface.removeColumn(
      'users',
      'role_id',
    )
  },
}
