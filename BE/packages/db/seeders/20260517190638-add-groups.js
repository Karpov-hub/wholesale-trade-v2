"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let group = await queryInterface.rawSelect(
      { tableName: "groups" },
      {
        where: { id: "d2050f87-c1dd-4cb8-b55d-d8fe2fd4de8a" },
      },
      ["id"]
    );
    if (!group)
      await queryInterface.bulkInsert({ tableName: "groups" }, [
        {
          id: "d2050f87-c1dd-4cb8-b55d-d8fe2fd4de8a",
          name: "groups1",
          description: "products",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          admin_id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
          users:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
        },
      ]);

    let group2 = await queryInterface.rawSelect(
      { tableName: "groups" },
      {
        where: { id: "44b75e7f-07c0-43be-aa93-757f771bbd45" },
      },
      ["id"]
    );
    if (!group2)
      await queryInterface.bulkInsert({ tableName: "groups" }, [
        {
          id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
          name: "groups2",
          description: "flowers",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          admin_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "groups" }, null, {});
  },
};
