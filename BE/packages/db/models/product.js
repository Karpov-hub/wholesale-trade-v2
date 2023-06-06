"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    static associate(models) {
      this.belongsTo(models.category, {
        foreignKey: "category_id",
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
      name: DataTypes.STRING(50),
      category_id: DataTypes.UUID,
      image: DataTypes.TEXT,

      price: DataTypes.STRING,
      discount: DataTypes.INTEGER,

      rating: DataTypes.INTEGER,
      reviews: DataTypes.TEXT,
      product_quantity: DataTypes.INTEGER,
      description: DataTypes.TEXT,

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
