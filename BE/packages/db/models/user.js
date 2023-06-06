"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {}
  }
  user.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      password: DataTypes.STRING(50),
      first_name: DataTypes.STRING(30),
      last_name: DataTypes.STRING(30),
      middle_name: DataTypes.STRING(30),

      shopping_cart: DataTypes.TEXT,
      favorites: DataTypes.TEXT,
      delivery_address: DataTypes.TEXT,
      notifications: DataTypes.TEXT,

      phone: DataTypes.STRING(20),
      roll: DataTypes.INTEGER,
      ctime: DataTypes.DATE,
      mtime: DataTypes.DATE,
    },
    {
      createdAt: "ctime",
      updatedAt: "mtime",
      deletedAt: false,
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
