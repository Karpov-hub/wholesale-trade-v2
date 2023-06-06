"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      password: {
        type: Sequelize.STRING(50),
      },
      first_name: {
        type: Sequelize.STRING(30),
      },
      last_name: {
        type: Sequelize.STRING(30),
      },
      middle_name: {
        type: Sequelize.STRING(30),
      },

      shopping_cart: {
        type: Sequelize.TEXT,
      },
      favorites: {
        type: Sequelize.TEXT,
      },
      delivery_address: {
        type: Sequelize.TEXT,
      },
      notifications: {
        type: Sequelize.TEXT,
      },

      phone: {
        type: Sequelize.STRING(20),
      },
      roll: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable({ tableName: "users" });
  },
};
