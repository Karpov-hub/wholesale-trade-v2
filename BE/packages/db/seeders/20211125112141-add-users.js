"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let user1 = await queryInterface.rawSelect(
      { tableName: "users" },
      {
        where: { id: "44b75e7f-07c0-43be-aa93-757f771bbd45" },
      },
      ["id"]
    );
    if (!user1)
      await queryInterface.bulkInsert({ tableName: "users" }, [
        {
          id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          first_name: "Mihail",
          last_name: "Karpov",
          middle_name: "Andreevich",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          phone: "8-909-385-35-23",
          roll: 1,
          delivery_address: '["Блюхера, дом 20"]',
          notifications:
            '[{"name": "Обновление заказа","description": "Статус вашего заказ был изменён на Подвержённый"}]',
        },
      ]);

    let user2 = await queryInterface.rawSelect(
      { tableName: "users" },
      {
        where: { id: "99313318-d59d-4e1f-b218-3c81d2a01395" },
      },
      ["id"]
    );
    if (!user2)
      await queryInterface.bulkInsert({ tableName: "users" }, [
        {
          id: "99313318-d59d-4e1f-b218-3c81d2a01395",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          first_name: "Christina",
          last_name: "Cherednichenko",
          middle_name: "Nikolavna",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          phone: "8-909-385-35-23",
          roll: 1,
          delivery_address: '["Блюхера, дом 20"]',
          notifications:
            '[{"name": "Обновление заказа","description": "Статус вашего заказ был изменён на Подвержённый"}]',
        },
      ]);

    let user3 = await queryInterface.rawSelect(
      { tableName: "users" },
      {
        where: { id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d" },
      },
      ["id"]
    );
    if (!user3)
      await queryInterface.bulkInsert({ tableName: "users" }, [
        {
          id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          first_name: "Olga",
          last_name: "Ivanova",
          middle_name: "Sergeevna",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          phone: "8-909-385-35-23",
          roll: 1,
          delivery_address: '["Блюхера, дом 20"]',
          notifications: "[]",
        },
      ]);

    let user4 = await queryInterface.rawSelect(
      { tableName: "users" },
      {
        where: { id: "f6db3344-16b0-47ef-b6e0-ae0ce69b8bbd" },
      },
      ["id"]
    );
    if (!user4)
      await queryInterface.bulkInsert({ tableName: "users" }, [
        {
          id: "f6db3344-16b0-47ef-b6e0-ae0ce69b8bbd",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          first_name: "Alexander",
          last_name: "Petrov",
          middle_name: "Andreevich",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          phone: "8-909-385-35-23",
          roll: 1,
          delivery_address: '["Блюхера, дом 20"]',
          notifications: "[]",
        },
      ]);

    let user5 = await queryInterface.rawSelect(
      { tableName: "users" },
      {
        where: { id: "ab5be8c0-28e5-4ae6-9364-59a89c6d5ef3" },
      },
      ["id"]
    );
    if (!user5)
      await queryInterface.bulkInsert({ tableName: "users" }, [
        {
          id: "ab5be8c0-28e5-4ae6-9364-59a89c6d5ef3",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          first_name: "Anna",
          last_name: "Sidorova",
          middle_name: "Petrovna",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          phone: "8-909-385-35-23",
          roll: 1,
          delivery_address: '["Блюхера, дом 20"]',
          notifications: "[]",
        },
      ]);

    let user6 = await queryInterface.rawSelect(
      { tableName: "users" },
      {
        where: { id: "5ef63cc5-ebdf-4e8b-b0a7-85c9d14b2e4e" },
      },
      ["id"]
    );
    if (!user6)
      await queryInterface.bulkInsert({ tableName: "users" }, [
        {
          id: "5ef63cc5-ebdf-4e8b-b0a7-85c9d14b2e4e",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          first_name: "Svetlana",
          last_name: "Fedorova",
          middle_name: "Ivanovna",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          phone: "8-909-385-35-23",
          roll: 1,
          delivery_address: '["Блюхера, дом 20"]',
          notifications: "[]",
        },
      ]);

    let user7 = await queryInterface.rawSelect(
      { tableName: "users" },
      {
        where: { id: "de5a63b0-2617-4c7e-8ecf-781b93419e7e" },
      },
      ["id"]
    );
    if (!user7)
      await queryInterface.bulkInsert({ tableName: "users" }, [
        {
          id: "de5a63b0-2617-4c7e-8ecf-781b93419e7e",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          first_name: "Dmitry",
          last_name: "Ivanov",
          middle_name: "Petrovich",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          phone: "8-909-385-35-23",
          roll: 1,
          delivery_address: '["Блюхера, дом 20"]',
          notifications: "[]",
        },
      ]);

    let user8 = await queryInterface.rawSelect(
      { tableName: "users" },
      {
        where: { id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e" },
      },
      ["id"]
    );
    if (!user8)
      await queryInterface.bulkInsert({ tableName: "users" }, [
        {
          id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
          password: "qzjq2ut0ZZnywe6Q+CZ/MfRnNHRidkok1xrBhD7nf+M=",
          first_name: "Marina",
          last_name: "Smirnova",
          middle_name: "Vladimirovna",
          shopping_cart:
            '[{"id": "e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "quantity": 15}, {"id": "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5", "quantity": 15}]',
          favorites:
            '["e0990142-8a6c-4caf-b5f2-1a17ddf986c4", "ec36739b-d10c-4c1e-a72f-b2aee73fe6d5"]',
          phone: "8-909-385-35-23",
          roll: 1,
          delivery_address: '["Блюхера, дом 20"]',
          notifications: "[]",
        },
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "users" }, null, {});
  },
};
