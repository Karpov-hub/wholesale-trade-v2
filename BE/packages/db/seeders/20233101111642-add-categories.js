"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ tableName: "categories" }, [
      {
        id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        name: "Электроника",
        description: "Гаджеты и электронные устройства",
      },
      {
        id: "a743d6a2-4a9b-45f7-a716-1c9b7f05693a",
        name: "Одежда и обувь",
        description: "Мода и стиль",
      },
      {
        id: "18a94f16-17d7-4a3e-b00c-591aae6d257a",
        name: "Домашние товары",
        description: "Товары для дома и интерьера",
      },
      {
        id: "ef4789f5-3bb3-4ea7-8d78-295ea295b5ab",
        name: "Спорт и отдых",
        description: "Товары для спорта и активного отдыха",
      },
      {
        id: "d24f1b8c-38c6-4de7-8dc3-b8f382aeb870",
        name: "Кухонные принадлежности",
        description: "Кухонные товары и аксессуары",
      },
      {
        id: "8762c01c-367f-4dfe-8811-99a09b860f7e",
        name: "Детские товары",
        description: "Товары для детей и младенцев",
      },
      {
        id: "efb6ef33-5ae9-412b-a635-82b2e97f7480",
        name: "Красота и уход",
        description: "Косметика и средства по уходу",
      },
      {
        id: "8d112c6b-2347-41f7-8ee5-5f8edf2a9e9f",
        name: "Техника для дома",
        description: "Бытовая техника",
      },
      {
        id: "6d5f70b7-1a38-47cd-b3c6-75b8c0e96f9a",
        name: "Автомобильные принадлежности",
        description: "Товары и аксессуары для автомобилей",
      },
      {
        id: "032d66d2-1be4-4f7b-967b-6df82de5df1b",
        name: "Хобби и развлечения",
        description: "Товары для хобби и развлечений",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "categories" }, null, {});
  },
};
