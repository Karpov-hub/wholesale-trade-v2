"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: "categories"
      },
      {
        id: {
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        }
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({
      tableName: "categories"
    });
  }
};
