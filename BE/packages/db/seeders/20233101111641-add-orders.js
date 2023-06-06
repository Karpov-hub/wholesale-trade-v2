"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let order = await queryInterface.rawSelect(
      { tableName: "orders" },
      {
        where: { id: "79e21971-29fc-477d-9931-739b645838c8" },
      },
      ["id"]
    );
    if (!order)
      await queryInterface.bulkInsert({ tableName: "orders" }, [
        {
          id: "79e21971-29fc-477d-9931-739b645838c8",
          user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
          ordered_products:
            '[{"id_prod": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "num_prod": 15}, {"id_prod": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "num_prod": 15}]',
          status: 2,
        },
      ]);

    let order2 = await queryInterface.rawSelect(
      { tableName: "orders" },
      {
        where: { id: "9a76ee66-5137-4431-9659-a5c0c9189e2b" },
      },
      ["id"]
    );
    if (!order2)
      await queryInterface.bulkInsert({ tableName: "orders" }, [
        {
          id: "9a76ee66-5137-4431-9659-a5c0c9189e2b",
          user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
          ordered_products:
            '[{"id_prod": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "num_prod": 8}, {"id_prod": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "num_prod": 15}]',
          status: 2,
        },
      ]);

    let order3 = await queryInterface.rawSelect(
      { tableName: "orders" },
      {
        where: { id: "dfb42c93-24e5-465f-99a9-ed8b02450b0d" },
      },
      ["id"]
    );
    if (!order3)
      await queryInterface.bulkInsert({ tableName: "orders" }, [
        {
          id: "dfb42c93-24e5-465f-99a9-ed8b02450b0d",
          user_id: "de5a63b0-2617-4c7e-8ecf-781b93419e7e",
          ordered_products:
            '[{"id_prod": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "num_prod": 15}, {"id_prod": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "num_prod": 8}]',
          status: 2,
        },
      ]);
    let order4 = await queryInterface.rawSelect(
      { tableName: "orders" },
      {
        where: { id: "834ba23a-efa0-46d2-a186-6702de962671" },
      },
      ["id"]
    );
    if (!order4)
      await queryInterface.bulkInsert({ tableName: "orders" }, [
        {
          id: "834ba23a-efa0-46d2-a186-6702de962671",
          user_id: "5ef63cc5-ebdf-4e8b-b0a7-85c9d14b2e4e",
          ordered_products:
            '[{"id_prod": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "num_prod": 1}, {"id_prod": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "num_prod": 15}]',
          status: 2,
        },
      ]);

    let order5 = await queryInterface.rawSelect(
      { tableName: "orders" },
      {
        where: { id: "48a73f52-86c4-43e5-aa16-a8dcb004f68a" },
      },
      ["id"]
    );
    if (!order5)
      await queryInterface.bulkInsert({ tableName: "orders" }, [
        {
          id: "48a73f52-86c4-43e5-aa16-a8dcb004f68a",
          user_id: "5ef63cc5-ebdf-4e8b-b0a7-85c9d14b2e4e",
          ordered_products:
            '[{"id_prod": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "num_prod": 15}, {"id_prod": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "num_prod": 1}]',
          status: 2,
        },
      ]);

    let order6 = await queryInterface.rawSelect(
      { tableName: "orders" },
      {
        where: { id: "00577697-ab6e-41f0-95fd-27370bb4d341" },
      },
      ["id"]
    );
    if (!order6)
      await queryInterface.bulkInsert({ tableName: "orders" }, [
        {
          id: "00577697-ab6e-41f0-95fd-27370bb4d341",
          user_id: "5ef63cc5-ebdf-4e8b-b0a7-85c9d14b2e4e",
          ordered_products:
            '[{"id_prod": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "num_prod": 5}, {"id_prod": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "num_prod": 5}]',
          status: 2,
        },
      ]);

    let order7 = await queryInterface.rawSelect(
      { tableName: "orders" },
      {
        where: { id: "bc1b5e21-9899-4f52-a3e7-a3205084d653" },
      },
      ["id"]
    );
    if (!order7)
      await queryInterface.bulkInsert({ tableName: "orders" }, [
        {
          id: "bc1b5e21-9899-4f52-a3e7-a3205084d653",
          user_id: "ab5be8c0-28e5-4ae6-9364-59a89c6d5ef3",
          ordered_products:
            '[{"id_prod": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "num_prod": 9}, {"id_prod": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "num_prod": 95}]',
          status: 2,
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "orders" }, null, {});
  },
};
