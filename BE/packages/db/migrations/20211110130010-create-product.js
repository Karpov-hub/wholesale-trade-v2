"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      image: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      discount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      rating: {
        type: Sequelize.INTEGER,
      },
      reviews: {
        type: Sequelize.TEXT,
      },
      product_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable({ tableName: "products" });
  },
};
