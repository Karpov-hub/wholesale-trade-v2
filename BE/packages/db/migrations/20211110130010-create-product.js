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
        type: Sequelize.STRING(50),
      },
      category_id: {
        type: Sequelize.UUID,
      },
      image: {
        type: Sequelize.TEXT,
      },

      price: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.INTEGER,
      },

      rating: {
        type: Sequelize.INTEGER,
      },
      reviews: {
        type: Sequelize.TEXT,
      },
      product_quantity: {
        type: Sequelize.INTEGER,
      },
      description: {
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
