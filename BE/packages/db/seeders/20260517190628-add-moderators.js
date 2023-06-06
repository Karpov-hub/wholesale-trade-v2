"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let moderator = await queryInterface.rawSelect(
      { tableName: "moderators" },
      {
        where: { id: "d2050f87-c1dd-4cb8-b55d-d8fe2fd4de8a" }
      },
      ["id"]
    );
    if (!moderator)
      await queryInterface.bulkInsert({ tableName: "moderators" }, [
        {
          id: "d2050f87-c1dd-4cb8-b55d-d8fe2fd4de8a",
          login: "moderators1@gmail.com",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          phone: "8 909 385 35 23",
        }
      ]);

    let moderator2 = await queryInterface.rawSelect(
      { tableName: "moderators" },
      {
        where: { id: "44b75e7f-07c0-43be-aa93-757f771bbd45" }
      },
      ["id"]
    );
    if (!moderator2)
      await queryInterface.bulkInsert({ tableName: "moderators" }, [
        {
          id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
          login: "moderators2@gmail.com",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          phone: "8 909 385 35 23",
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "moderators" }, null, {});
  }
};
