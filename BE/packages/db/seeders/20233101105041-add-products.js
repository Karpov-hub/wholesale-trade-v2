"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert({ tableName: "products" }, [
      {
        id: "c2f1a566-0b7e-4df5-b688-46b34a8b4e24",
        name: "Футболка",
        category_id: "a743d6a2-4a9b-45f7-a716-1c9b7f05693a",
        user_id: "8792d409-2e84-43d1-a7e2-29b9481b2e1e",
        price: 19.99,
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
        price: 39.99,
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
        price: 29.99,
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
        price: 9.99,
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
        price: 499.99,
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
        price: 89.99,
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
        price: 39.99,
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
        price: 19.99,
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
        price: 19.99,
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
        price: 29.99,
        discount: 0,
        reviews: "[]",
        rating: 0,
        product_quantity: 10,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5312993/img_id683095104744541357.jpeg/orig  ","https://avatars.mds.yandex.net/get-mpic/5251502/img_id1446586909386171192.png/orig","https://avatars.mds.yandex.net/get-mpic/4902598/img_id1870390132649744710.jpeg/orig"]',
        description:
          "Гантели - идеальный инструмент для занятий спортом и укрепления мышц. Изготовлены из высококачественных материалови имеют удобную форму для хвата.",
      },

      {
        id: "d6280a6a-71d4-4a61-b512-ec3b057d5d69",
        name: "Кроссовки Nike Air Max",
        category_id: "a743d6a2-4a9b-45f7-a716-1c9b7f05693a",
        user_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        price: 8990,
        discount: 0,
        reviews: "[]",
        rating: 4,
        product_quantity: 30,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/7473874/img_id7128049712297677443.jpeg/orig"]',
        description: "Удобные и стильные кроссовки для активного образа жизни.",
      },
      {
        id: "73d1b6a0-8e09-4d81-b0e2-fdfe217b60d2",
        name: "Фен Braun Satin Hair 7",
        category_id: "18a94f16-17d7-4a3e-b00c-591aae6d257a",
        user_id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
        price: 2990,
        discount: 20,
        reviews: "[]",
        rating: 4,
        product_quantity: 20,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5284145/img_id9069686074374442797.jpeg/orig"]',
        description:
          "Мощный фен с различными режимами и насадками для создания причесок.",
      },
      {
        id: "10c6f60f-4ff0-4a8d-9df9-bd2bbedba5c6",
        name: "Велосипед Stels Navigator 600",
        category_id: "ef4789f5-3bb3-4ea7-8d78-295ea295b5ab",
        user_id: "f6db3344-16b0-47ef-b6e0-ae0ce69b8bbd",
        price: 21990,
        discount: 15,
        reviews: "[]",
        rating: 4,
        product_quantity: 10,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5239537/img_id5247125343850062423.jpeg/orig"]',
        description: "Универсальный велосипед для активного отдыха и спорта.",
      },

      {
        id: "c579b99a-2b25-4c94-9a2c-7ad91ad8d5e0",
        name: "Ноутбук Dell XPS 13",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
        price: 84990,
        discount: 10,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/4304063/img_id6537065206174110379.jpeg/orig"]',
        description:
          "Ноутбук Dell XPS 13 - компактный и мощный ноутбук с высоким разрешением дисплея и продолжительным временем работы от аккумулятора.",
      },
      {
        id: "fb39e998-3e8e-4ef9-9143-4b4f7002856a",
        name: "Телевизор LG OLED CX",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        price: 79990,
        discount: 20,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 30,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/4606255/img_id6731304619691134514.jpeg/orig"]',
        description:
          "Телевизор LG OLED CX - высококачественный телевизор с технологией OLED и умными функциями.",
      },
      {
        id: "77faf7d1-89fc-41fa-83f3-621b4b944a61",
        name: "Наушники Sony WH-1000XM4",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        price: 24990,
        discount: 15,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 40,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/4386141/img_id3192445659604357803.jpeg/orig"]',
        description:
          "Наушники Sony WH-1000XM4 - шумоподавляющие беспроводные наушники с высоким качеством звука и долгим временем работы от аккумулятора.",
      },
      {
        id: "4b408a11-41f0-4059-a447-c8524cc7bd0d",
        name: "Смартфон Samsung Galaxy S21",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
        price: 69990,
        discount: 5,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 100,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5233681/img_id6187862100290802397.jpeg/orig"]',
        description:
          "Смартфон Samsung Galaxy S21 - мощный и стильный смартфон с высококачественным дисплеем и продвинутыми камерами.",
      },
      {
        id: "765656c8-4bf2-4084-9d27-bddd90018909",
        name: "Ноутбук MacBook Pro 16",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        price: 129990,
        discount: 0,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5242361/img_id2420073412246465223.jpeg/orig"]',
        description:
          "Ноутбук MacBook Pro 16 - мощный и производительный ноутбук от Apple с высококачественным дисплеем Retina и продолжительным временем работы от аккумулятора.",
      },
      {
        id: "76ce9d7a-0b88-4a51-90d3-7b27df7e0be9",
        name: "Кофемашина De'Longhi Magnifica S",
        category_id: "8d112c6b-2347-41f7-8ee5-5f8edf2a9e9f",
        user_id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
        price: 2999,
        discount: 10,
        reviews: "[]",
        rating: 4,
        product_quantity: 30,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5234850/img_id4914036461766534550.jpeg/orig"]',
        description:
          "Кофемашина De'Longhi Magnifica S - автоматическая кофемашина с широким набором функций и возможностью приготовления различных видов кофе.",
      },
      {
        id: "a8409d2b-444e-4d2e-88e0-9073ec2caf43",
        name: "Смарт-часы Apple Watch Series 6",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
        price: 2499,
        discount: 0,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5279750/img_id7422563259148097831.jpeg/orig"]',
        description:
          "Смарт-часы Apple Watch Series 6 - элегантные и функциональные умные часы с большим набором возможностей и датчиками для отслеживания физической активности.",
      },
      {
        id: "0b297426-0dad-43cf-b9f2-71f54d867511",
        name: "Футбольный мяч Adidas",
        category_id: "032d66d2-1be4-4f7b-967b-6df82de5df1b",
        user_id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
        price: 1999,
        discount: 0,
        reviews: "[]",
        rating: 4,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-marketpic/6099605/picde65eea30f194428588091ef3ff774e3/orig"]',
        description:
          "Футбольный мяч Adidas - высококачественный мяч для игры в футбол с отличной мягкостью и контролем.",
      },
      {
        id: "a144b6a6-6201-4184-adeb-55bd7e3c59b5",
        name: "Шоколад Lindt Excellence",
        category_id: "efb6ef33-5ae9-412b-a635-82b2e97f7480",
        user_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        price: 499,
        discount: 15,
        reviews: "[]",
        rating: 4,
        product_quantity: 100,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/4984138/img_id8389734805929468919.jpeg/orig"]',
        description:
          "Шоколад Lindt Excellence - изысканный шоколад премиум-класса с разнообразными вкусами и шелковистой текстурой.",
      },
      {
        id: "3226cd92-203f-4a3b-9b26-2b75e0aa9bc9",
        name: "Наушники Sony WH-1000XM4",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
        price: 2490,
        discount: 10,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 30,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/4080967/img_id8128133420125143221.jpeg/orig"]',
        description:
          "Наушники Sony WH-1000XM4 - беспроводные шумоподавляющие наушники с превосходным качеством звука и долгим временем работы от аккумулятора.",
      },
      {
        id: "c75acd48-f0cf-4589-896a-daada400e894",
        name: "Камера Canon EOS R5",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
        price: 99990,
        discount: 0,
        reviews: "[]",
        rating: 4,
        product_quantity: 5,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/1866068/img_id2287277743134659001.png/orig"]',
        description:
          "Камера Canon EOS R5 - профессиональная беззеркальная камера с высоким разрешением и множеством возможностей для фотографии и видеосъемки.",
      },
      {
        id: "ad694618-f86f-4d1c-a0a3-397535ff4b7c",
        name: "Смартфон Samsung Galaxy S21",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
        price: 9999,
        discount: 10,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5233681/img_id6187862100290802397.jpeg/orig"]',
        description:
          "Смартфон Samsung Galaxy S21 - мощный и современный смартфон с высокой производительностью, отличным дисплеем и передовыми функциями.",
      },
      {
        id: "de0bee78-8812-4dca-a43e-25720ef46cd6",
        name: "Ноутбук Apple MacBook Pro",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        price: 129999,
        discount: 0,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 30,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5242361/img_id2420073412246465223.jpeg/orig"]',
        description:
          "Ноутбук Apple MacBook Pro - надежный и мощный ноутбук с высокой производительностью, стильным дизайном и продолжительным временем автономной работы.",
      },
      {
        id: "6c526f82-0505-4bd5-bbd9-0c450e668edc",
        name: "Телевизор LG OLED CX",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
        price: 9999,
        discount: 15,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 20,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/4250892/img_id3331157167952808236.jpeg/orig"]',
        description:
          "Телевизор LG OLED CX - высококачественный телевизор с технологией OLED, великолепным качеством изображения и поддержкой современных функций Smart TV.",
      },
      {
        id: "8dd32056-d7f7-4b81-b998-37f8d930b99f",
        name: "Наушники Sony WH-1000XM4",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
        price: 2499,
        discount: 20,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 100,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5345452/img_id6879468432363438497.jpeg/orig"]',
        description:
          "Наушники Sony WH-1000XM4 - беспроводные наушники с активным шумоподавлением, высоким качеством звука и долгим временем работы от одного заряда.",
      },
      {
        id: "0f24d7f3-fd66-4769-9419-c1050a1587d3",
        name: "Фотоаппарат Canon EOS R5",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "44b75e7f-07c0-43be-aa93-757f771bbd45",
        price: 32999,
        discount: 0,
        reviews: "[]",
        rating: 4,
        product_quantity: 20,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5220932/img_id7340363232952078748.jpeg/orig"]',
        description:
          "Фотоаппарат Canon EOS R5 - профессиональная камера с высоким разрешением, быстрым автофокусом и возможностью съемки видео в 8K.",
      },
      {
        id: "22fef140-85ac-42ee-b983-e47cff1a64cd",
        name: "Портативная колонка JBL Charge 4",
        category_id: "8762c01c-367f-4dfe-8811-99a09b860f7e",
        user_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        price: 599,
        discount: 10,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 50,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5312993/img_id683095104744541357.jpeg/orig",]',
        description:
          "Портативная колонка JBL Charge 4 - мощная колонка с отличным качеством звука, водонепроницаемым корпусом и долгим временем работы от аккумулятора.",
      },
      {
        id: "684bd7ae-453c-46c1-95ed-3fd64c15737a",
        name: "Смарт-часы Apple Watch Series 6",
        category_id: "ce1eb93d-22e1-4a4f-8e99-2adc7496a234",
        user_id: "7fe6128c-60c6-4af9-bc89-9c12d9ef5e5d",
        price: 1999,
        discount: 0,
        reviews: "[]",
        rating: 4,
        product_quantity: 30,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5391389/img_id1002833500338952495.png/orig"]',
        description:
          "Смарт-часы Apple Watch Series 6 - элегантные и функциональные часы с ярким дисплеем, множеством датчиков и возможностью отслеживания физической активности.",
      },
      {
        id: "76d6d95e-07c0-4ae1-8fd2-82d1f94a864b",
        name: "Игровая консоль PlayStation 5",
        category_id: "8762c01c-367f-4dfe-8811-99a09b860f7e",
        user_id: "99313318-d59d-4e1f-b218-3c81d2a01395",
        price: 4499,
        discount: 5,
        reviews:
          '[{"id_user": "9cfa5aa3-168b-4d25-bb01-8ea44a593eb7", "value": 9, "comment": "Отличное качество звука!"}]',
        rating: 4,
        product_quantity: 10,
        image:
          '["https://avatars.mds.yandex.net/get-mpic/5068955/img_id6047884633257749435.jpeg/orig"]',
        description:
          "Игровая консоль PlayStation 5 - мощная и инновационная консоль нового поколения с поддержкой 4K-графики, высокой скоростью загрузки и широким каталогом игр.",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete({ tableName: "products" }, null, {});
  },
};
