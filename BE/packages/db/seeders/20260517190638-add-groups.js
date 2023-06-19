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
            '[{"id": "c2f1a566-0b7e-4df5-b688-46b34a8b4e24", "quantity": 15}, {"id": "8eb1a4d2-6ad4-4b2a-a3e2-9a20b4fc82d3", "quantity": 15}]',
          favorites:
            '["2cc5127b-b5e1-4b7e-9b57-44a3660ddc2b", "e9a1e3b0-7922-4dbb-88fe-6a1ed0fe7dce"]',
          admin_id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
          users:
            '["c556d6a1-6a95-4b44-8e6d-1fe8f376d61f", "8f2efca9-bbe7-4f09-8b47-b24d240145c0"]',
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
            '[{"id": "2cc5127b-b5e1-4b7e-9b57-44a3660ddc2b, "quantity": 15}, {"id": "e9a1e3b0-7922-4dbb-88fe-6a1ed0fe7dce", "quantity": 15}]',
          favorites:
            '["18c351cd-6d34-4d66-8a8c-aa3af94c449e", "05a6c381-5eaf-4139-9f1f-14167a78c35b"]',
          admin_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "groups" }, null, {});
  },
};
