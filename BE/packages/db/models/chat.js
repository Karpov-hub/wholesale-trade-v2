"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    static associate(models) {
      this.belongsTo(models.group, {
        foreignKey: "group_id",
        targetKey: "id",
      });
    }
  }
  chat.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING(100),
      massages: DataTypes.TEXT,
      group_id: DataTypes.UUID,
      ctime: DataTypes.DATE,
      mtime: DataTypes.DATE,
    },
    {
      createdAt: "ctime",
      updatedAt: "mtime",
      deletedAt: false,
      sequelize,
      modelName: "chat",
    }
  );
  return chat;
};
