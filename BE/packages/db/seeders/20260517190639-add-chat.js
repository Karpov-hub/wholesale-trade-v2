"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let chat = await queryInterface.rawSelect(
      { tableName: "chats" },
      {
        where: { id: "d2050f87-c1dd-4cb8-b55d-d8fe2fd4de8a" },
      },
      ["id"]
    );
    if (!chat)
      await queryInterface.bulkInsert({ tableName: "chats" }, [
        {
          id: "d2050f87-c1dd-4cb8-b55d-d8fe2fd4de8a",
          name: "chats 1",
          massages:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "user_id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ctime": "", "body": "Привет"}, {"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "user_id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ctime": "", "body": "Привет"}]',
          group_id: "d2050f87-c1dd-4cb8-b55d-d8fe2fd4de8a",
        },
      ]);

    let chat2 = await queryInterface.rawSelect(
      { tableName: "chats" },
      {
        where: { id: "44b75e7f-07c0-43be-aa93-757f771bbd45" },
      },
      ["id"]
    );
    if (!chat2)
      await queryInterface.bulkInsert({ tableName: "chats" }, [
        {
          id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
          name: "chat 2",
          massages:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "user_id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ctime": "", "body": "Привет"}, {"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "user_id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ctime": "", "body": "Привет"}]',
          group_id: "d2050f87-c1dd-4cb8-b55d-d8fe2fd4de8a",
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "chats" }, null, {});
  },
};
