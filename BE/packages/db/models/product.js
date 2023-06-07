"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      this.belongsTo(models.category, {
        foreignKey: "category_id",
        targetKey: "id",
      });
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id",
      });
    }
  }
  product.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      category_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      image: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      price: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      discount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      rating: DataTypes.INTEGER,
      reviews: DataTypes.TEXT,
      product_quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },

      ctime: DataTypes.DATE,
      mtime: DataTypes.DATE,
    },
    {
      createdAt: "ctime",
      updatedAt: "mtime",
      deletedAt: false,
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
