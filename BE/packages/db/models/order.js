'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "user_id",
        targetKey: "id"
      });
    }
  }
  order.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID
    },
    user_id: DataTypes.UUID,
    ordered_products: DataTypes.STRING,
    status: DataTypes.TEXT,
    ctime: DataTypes.DATE,
  }, {
    createdAt: "ctime",
    updatedAt: false,
    deletedAt: false,
    sequelize,
    modelName: 'order',
  });
  return order;
};