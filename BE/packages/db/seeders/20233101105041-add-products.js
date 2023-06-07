"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ tableName: "products" }, [
      {
        id: "c2f1a566-0b7e-4df5-b688-46b34a8b4e24",
        name: "Футболка",
        category_id: "a743d6a2-4a9b-45f7-a716-1c9b7f05693a",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "19.99",
        discount: 10,
        reviews: "[]",
        rating: 0,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5229821/img_id8302462665572822144.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/1600461/img_id4462310261183614724.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/1715213/img_id8973522221964094450.jpeg/orig"]',
        description:
          "Футболка - универсальная одежда для повседневной носки. Изготовлена из высококачественного материала, обеспечивающего комфорт и свободу движений.",
      },
      {
        id: "8eb1a4d2-6ad4-4b2a-a3e2-9a20b4fc82d3",
        name: "Джинсы",
        category_id: "a743d6a2-4a9b-45f7-a716-1c9b7f05693a",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "39.99",
        discount: 0,
        reviews: "[]",
        rating: 0,
        product_quantity: 30,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/1657306/img_id4369886166336434266.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/397397/img_id624619066672663048.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/5277894/img_id3341043331023890613.jpeg/orig"]',
        description:
          "Джинсы - стильная и практичная одежда для создания модного образа. Изготовлены из прочного материала, обеспечивающего долгий срок службы.",
      },
      {
        id: "2cc5127b-b5e1-4b7e-9b57-44a3660ddc2b",
        name: "Сумка-кроссбоди",
        category_id: "a743d6a2-4a9b-45f7-a716-1c9b7f05693a",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "29.99",
        discount: 0,
        reviews: "[]",
        rating: 0,
        product_quantity: 20,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5236357/img_id5269347083674659525.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/4525599/img_id1544092232093431773.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/6217624/img_id498186410093735293.jpeg/orig"]',
        description:
          "Сумка-кроссбоди - стильный аксессуар для хранения ваших вещей. Имеет компактный размер и удобный ремень для ношения на плече или через тело.",
      },
      {
        id: "e9a1e3b0-7922-4dbb-88fe-6a1ed0fe7dce",
        name: "Браслет",
        category_id: "a743d6a2-4a9b-45f7-a716-1c9b7f05693a",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "9.99",
        discount: 20,
        reviews:
          '[{"id_user": "56b0a793-5f18-45a2-84da-93893d5b67e1", "value": 10, "comment": "Красивый браслет!"}]',
        rating: 5,
        product_quantity: 100,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/1657306/img_id4877882716342364488.jpeg/orig"]',
        description:
          "Браслет - модный аксессуар, который подчеркнет ваш индивидуальный стиль. Изготовлен из качественных материалов и украшен стильными элементами.",
      },
      {
        id: "18c351cd-6d34-4d66-8a8c-aa3af94c449e",
        name: "Смартфон Xiaomi POCO F5 8/256 ГБ RU, Dual nano SIM, черный",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "499.99",
        discount: 0,
        reviews: "[]",
        rating: 0,
        product_quantity: 10,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/1360852/img_id4375403627533141778.jpeg/orig ","https://avatars.mds.yandex.net/get-mpic/1360852/img_id4375403627533141778.jpeg/orig"]',
        description:
          "Смартфон - многофункциональное устройство с высокой производительностью. Обладает большим дисплеем, качественной камерой и множеством полезных функций.",
      },
      {
        id: "05a6c381-5eaf-4139-9f1f-14167a78c35b",
        name: "Беспроводные наушники realme Buds T100, черный",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "89.99",
        discount: 15,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/1521939/img_id8586595032896634827.png/orig","https://avatars.mds.yandex.net/get-mpic/1521939/img_id8586595032896634827.png/orig","https://avatars.mds.yandex.net/get-mpic/5363183/img_id7275655776283567455.png/orig"]',
        description:
          "Наушники - отличное устройство для наслаждения качественным звуком. Имеют удобную посадку и долгое время работы от аккумулятора.",
      },
      {
        id: "8f2efca9-bbe7-4f09-8b47-b24d240145c0",
        name: "Светильник настольный под лампу СНО-15Б на основании 60Вт E27 230В белый (коробка) IN HOME (арт. 4690612012896)",
        category_id: "18a94f16-17d7-4a3e-b00c-591aae6d257a",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "39.99",
        discount: 0,
        reviews:
          '[{"id_user": "27a1cb5d-85e7-4ed9-8de2-06af25c5d1c3", "value": 7, "comment": "Красивая и функциональная лампа!"}]',
        rating: 4,
        product_quantity: 30,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5236458/img_id7696284497889154295.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/5235101/img_id5727203680515727449.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/4262452/img_id7109083386218920187.jpeg/orig"]',
        description:
          "Настольная лампа - стильный предмет интерьера, который создаст уютную атмосферу в вашем помещении. Обладает различными режимами освещения и регулируемой яркостью.",
      },
      {
        id: "e7cda1e2-cf0d-4eb9-89b3-724ce9c446a1",
        name: "Подушка Askona Spring Pillow",
        category_id: "18a94f16-17d7-4a3e-b00c-591aae6d257a",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "19.99",
        discount: 10,
        reviews:
          '[{"id_user": "a4fcb07f-bf68-4f67-b964-1b739e2e532e", "value": 8, "comment": "Мягкая и комфортная подушка!"}]',
        rating: 4,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/7689172/img_id4887499663854003347.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/7689172/img_id4887499663854003347.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/7665750/img_id6284016632551063873.jpeg/orig"]',
        description:
          "Подушка - идеальное дополнение к вашему интерьеру. Изготовлена из качественных материалов, обеспечивающих комфортный сон и отдых.",
      },
      {
        id: "c556d6a1-6a95-4b44-8e6d-1fe8f376d61f",
        name: "Футбольный мяч профессиональный FIFA Sanander размер 5, CX-0057 / Белый",
        category_id: "ef4789f5-3bb3-4ea7-8d78-295ea295b5ab",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "19.99",
        discount: 0,
        reviews:
          '[{"id_user": "cbbef768-1f8b-4ed3-9ea0-1fc422999824", "value": 9, "comment": "Отличный мяч для игры!"}]',
        rating: 5,
        product_quantity: 20,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5234464/img_id2926439145018036419.jpeg/orig","https://avatars.mds.yandex.net/get-mpic/364668/img_id5211051532172715282.jpeg/orig"]',
        description:
          "Футбольный мяч - необходимый аксессуар для активных игр и тренировок. Изготовлен из прочного материала, обеспечивающего долгую эксплуатацию.",
      },
      {
        id: "61f1fe84-21e6-4a35-9530-3ef90e3b12c3",
        name: "Гантели разборные с грифом 2 шт х 10 кг, 20 кг",
        category_id: "ef4789f5-3bb3-4ea7-8d78-295ea295b5ab",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: "29.99",
        discount: 0,
        reviews: "[]",
        rating: 0,
        product_quantity: 10,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5312993/img_id683095104744541357.jpeg/orig  ","https://avatars.mds.yandex.net/get-mpic/5251502/img_id1446586909386171192.png/orig","https://avatars.mds.yandex.net/get-mpic/4902598/img_id1870390132649744710.jpeg/orig"]',
        description:
          "Гантели - идеальный инструмент для занятий спортом и укрепления мышц. Изготовлены из высококачественных материалови имеют удобную форму для хвата.",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "products" }, null, {});
  },
};
