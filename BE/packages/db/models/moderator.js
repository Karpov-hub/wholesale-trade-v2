"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class moderator extends Model {
    static associate(models) {
    }
  }
  moderator.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID
      },
      login: DataTypes.STRING(40),
      password: DataTypes.STRING(50),

      phone: DataTypes.STRING(20),
      ctime: DataTypes.DATE,
      mtime: DataTypes.DATE,
    },
    {
      createdAt: "ctime",
      updatedAt: "mtime",
      deletedAt: false,
      sequelize,
      modelName: "moderator"
    }
  );
  return moderator;
};
