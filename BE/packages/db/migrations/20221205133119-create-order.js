"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      {
        tableName: "orders"
      },
      {
        id: {
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: "users",
            key: "id"
          },
          onUpdate: "cascade",
          onDelete: "cascade"
        },
        ordered_products: {
          type: Sequelize.STRING
        },
        status: {
          type: Sequelize.TEXT
        },
        ctime: {
          type: Sequelize.DATE
        },
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({
      tableName: "orders"
    });
  }
};
