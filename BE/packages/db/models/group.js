"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "admin_id",
        targetKey: "id",
      });
    }
  }
  group.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING(100),
      description: DataTypes.STRING(100),
      shopping_cart: DataTypes.TEXT,
      favorites: DataTypes.TEXT,
      users: DataTypes.TEXT,
      admin_id: DataTypes.UUID,
      ctime: DataTypes.DATE,
      mtime: DataTypes.DATE,
    },
    {
      createdAt: "ctime",
      updatedAt: "mtime",
      deletedAt: false,
      sequelize,
      modelName: "group",
    }
  );
  return group;
};
