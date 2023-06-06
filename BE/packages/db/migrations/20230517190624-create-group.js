"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("groups", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      description: {
        type: Sequelize.STRING(100),
      },
      shopping_cart: {
        type: Sequelize.TEXT,
      },
      favorites: {
        type: Sequelize.TEXT,
      },
      admin_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      ctime: {
        type: Sequelize.DATE,
      },
      mtime: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ tableName: "groups" });
  },
};
