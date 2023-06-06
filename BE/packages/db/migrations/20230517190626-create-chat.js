"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("chats", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      massages: {
        type: Sequelize.TEXT,
      },
      group_id: {
        type: Sequelize.UUID,
        references: {
          model: "groups",
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
    await queryInterface.dropTable({ tableName: "chats" });
  },
};
