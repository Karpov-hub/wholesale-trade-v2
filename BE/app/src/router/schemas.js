module.exports = {
  auth: {
    signin: {
      type: "object",
      properties: {
        phone: { type: "string" },
        password: { type: "string" },
      },
      required: ["phone", "password"],
    },
    refreshToken: {
      type: "object",
      properties: {
        session_token: { type: "string" },
      },
      required: ["session_token"],
    },
    logout: {
      type: "object",
      properties: {
        session_token: { type: "string" },
      },
      required: ["session_token"],
    },
  },
  category: {
    // "create-category": {
    //   type: "object",
    //   properties: {
    //     name: { type: "string" },
    //     description: { type: "string" },
    //   },
    //   required: ["name", "description"],
    // },
    "update-category": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        category_id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
      },
      required: ["id", "session_token"],
    },
    "delete-category": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        category_id: { type: "string" },
      },
      required: ["id", "session_token"],
    },
    "get-categories": {
      type: "object",
      properties: {},
      required: [],
    },
  },
  order: {
    "get-orders": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        start: { type: "integer" },
        limit: { type: "integer" },
      },
      required: ["session_token"],
    },
    "get-orders-moderator": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        status: { type: "integer" },
        start: { type: "integer" },
        limit: { type: "integer" },
      },
      required: ["session_token"],
    },
    "get-order-details": {
      type: "object",
      properties: {
        order_id: { type: "string" },
        session_token: { type: "string" },
      },
      required: ["session_token", "order_id"],
    },
    "update-status": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        status: { type: "integer" },
        order_id: { type: "string" },
      },
      required: ["session_token", "status", "order_id"],
    },
  },
  product: {
    "get-product": {
      type: "object",
      properties: {
        start: { type: "integer" },
        limit: { type: "integer" },
        category_id: { type: "string" },
        rating: { type: "integer" },
        name: { type: "string" },
        price_min: { type: ["number", "string"] },
        price_max: { type: ["number", "string"] },
      },
    },
    "get-product-details": {
      type: "object",
      properties: {
        product_id: { type: "string" },
      },
      required: ["product_id"],
    },
    "create-product": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        name: { type: "string", maxLength: 100 },
        category_id: { type: "string" },
        image: { type: "string" },
        price: { type: "number" },
        product_quantity: { type: "integer" },
        description: { type: "string" },
      },
      required: [
        "session_token",
        "name",
        "category_id",
        "image",
        "price",
        "product_quantity",
        "description",
      ],
    },
    "create-product-rating": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        product_id: { type: "string" },
        value: { type: "integer" },
        comment: { type: "string" },
      },
      required: ["session_token", "product_id", "value"],
    },
    "delete-product": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        product_id: { type: "string" },
      },
      required: ["session_token", "product_id"],
    },
    "update-product": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        product_id: { type: "string" },
        name: { type: "string", maxLength: 100 },
        category_id: { type: "string" },
        image: { type: "object" },
        price: { type: "number" },
        product_quantity: { type: "integer" },
        description: { type: "string" },
      },
      required: [
        "session_token",
        "product_id",
        "name",
        "category_id",
        "image",
        "price",
        "product_quantity",
        "description",
      ],
    },
    "update-product-discount": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        discount: { type: "integer" },
        product_id: { type: "string" },
      },
      required: ["session_token", "discount", "product_id"],
    },
  },
  user: {
    auth: {
      signin: {
        type: "object",
        properties: {
          phone: { type: "string" },
          password: { type: "string" },
        },
        required: ["phone", "password"],
      },
      signup: {
        type: "object",
        properties: {
          first_name: { type: "string" },
          last_name: { type: "string" },
          middle_name: { type: "string" },
          roll: { type: "integer" },
          phone: { type: "string" },
          password: { type: "string" },
        },
        required: ["phone", "password"],
      },
    },
    profile: {
      "get-data": {
        type: "object",
        properties: {
          session_token: { type: "string" },
        },
        required: ["session_token"],
      },
      "update-user": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          middle_name: { type: "string" },
          phone: { type: "string" },
          delivery_address: { type: "array" },
        },
        required: [
          "session_token",
          "first_name",
          "last_name",
          "middle_name",
          "phone",
          "delivery_address",
        ],
      },
      "update-user-password": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          password: { type: "string" },
        },
        required: ["session_token", "password"],
      },
      "delete-user": {
        type: "object",
        properties: {
          session_token: { type: "string" },
        },
        required: ["session_token"],
      },
    },
    favorite: {
      "get-product-favorite": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          start: { type: "integer" },
          limit: { type: "integer" },
        },
        required: ["session_token"],
      },
      "add-product-favorite": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          id_prod: { type: "string" },
        },
        required: ["session_token", "id_prod"],
      },
      "delete-product-favorite": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          id_prod: { type: "string" },
        },
        required: ["session_token", "id_prod"],
      },
      "move-favorite-login": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          favoriteList: { type: "object" },
        },
        required: ["session_token", "favoriteList"],
      },
    },
    shoppingCart: {
      "get-product-shoppingCart": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          start: { type: "integer" },
          limit: { type: "integer" },
        },
        required: ["session_token"],
      },
      "add-product-shoppingCart": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          id_prod: { type: "string" },
          quantity: { type: "integer" },
        },
        required: ["session_token", "id_prod", "quantity"],
      },
      "delete-product-shoppingCart": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          id_prod: { type: "string" },
        },
        required: ["session_token", "id_prod"],
      },
      "move-cart-login": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          shoppingCartList: { type: "object" },
        },
        required: ["session_token", "shoppingCartList"],
      },
    },
    "buy-products": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        ordered_products: { type: "array" },
      },
      required: ["session_token", "ordered_products"],
    },
    "get-notifications": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        start: { type: "integer" },
        limit: { type: "integer" },
      },
      required: ["session_token"],
    },
  },
  group: {
    get: {
      type: "object",
      properties: {
        session_token: { type: "string" },
      },
      required: ["session_token"],
    },
    create: {
      type: "object",
      properties: {
        session_token: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
      },
      required: ["session_token", "name", "description"],
    },
    delete: {
      type: "object",
      properties: {
        session_token: { type: "string" },
        group_id: { type: "string" },
      },
      required: ["session_token", "group_id"],
    },
    "get-info": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        group_id: { type: "string" },
      },
      required: ["session_token", "group_id"],
    },
    "update-info": {
      type: "object",
      properties: {
        session_token: { type: "string" },
        group_id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
      },
      required: ["session_token", "group_id", "name", "description"],
    },
    members: {
      "get-members": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          group_id: { type: "string" },
        },
        required: ["session_token", "group_id"],
      },
      add: {
        type: "object",
        properties: {
          session_token: { type: "string" },
          user_id: { type: "string" },
          group_id: { type: "string" },
        },
        required: ["session_token", "group_id", "user_id"],
      },
      delete: {
        type: "object",
        properties: {
          session_token: { type: "string" },
          user_id: { type: "string" },
          group_id: { type: "string" },
        },
        required: ["session_token", "group_id", "user_id"],
      },
      "transfer-admin-rights": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          user_id: { type: "string" },
          group_id: { type: "string" },
        },
        required: ["session_token", "group_id", "user_id"],
      },
    },
    chats: {
      "get-chats": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          group_id: { type: "string" },
        },
        required: ["session_token", "group_id"],
      },
      create: {
        type: "object",
        properties: {
          session_token: { type: "string" },
          chatName: { type: "string" },
          group_id: { type: "string" },
        },
        required: ["session_token", "group_id", "chatName"],
      },
      delete: {
        type: "object",
        properties: {
          session_token: { type: "string" },
          chat_id: { type: "string" },
        },
        required: ["session_token", "chat_id"],
      },
      "update-name": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          chat_id: { type: "string" },
          newChatName: { type: "string" },
        },
        required: ["session_token", "chat_id", "newChatName"],
      },
      messages: {
        "get-messages": {
          type: "object",
          properties: {
            session_token: { type: "string" },
            chat_id: { type: "string" },
          },
          required: ["session_token", "chat_id"],
        },
        add: {
          type: "object",
          properties: {
            session_token: { type: "string" },
            chat_id: { type: "string" },
            mes: { type: "string" },
          },
          required: ["session_token", "chat_id", "mes"],
        },
        delete: {
          type: "object",
          properties: {
            session_token: { type: "string" },
            chat_id: { type: "string" },
            message_id: { type: "string" },
          },
          required: ["session_token", "chat_id", "message_id"],
        },
        update: {
          type: "object",
          properties: {
            session_token: { type: "string" },
            chat_id: { type: "string" },
            message_id: { type: "string" },
            updated_message: { type: "string" },
          },
          required: [
            "session_token",
            "chat_id",
            "message_id",
            "updated_message",
          ],
        },
        search: {
          type: "object",
          properties: {
            session_token: { type: "string" },
            chat_id: { type: "string" },
            search_query: { type: "string" },
          },
          required: ["session_token", "chat_id", "search_query"],
        },
        "share-product": {
          type: "object",
          properties: {
            session_token: { type: "string" },
            chat_id: { type: "string" },
            product_id: { type: "string" },
          },
          required: ["session_token", "chat_id", "product_id"],
        },
      },
    },
    favoriteG: {
      "get-product-favorite": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          group_id: { type: "string" },
          start: { type: "integer" },
          limit: { type: "integer" },
        },
        required: ["session_token", "group_id"],
      },
      "add-product-favorite": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          group_id: { type: "string" },
          id_prod: { type: "string" },
        },
        required: ["session_token", "id_prod", "group_id"],
      },
      "delete-product-favorite": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          group_id: { type: "string" },
          id_prod: { type: "string" },
        },
        required: ["session_token", "id_prod", "group_id"],
      },
    },
    shoppingCartG: {
      "get-product-shoppingCart": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          group_id: { type: "string" },
          start: { type: "integer" },
          limit: { type: "integer" },
        },
        required: ["session_token", "group_id"],
      },
      "add-product-shoppingCart": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          group_id: { type: "string" },
          id_prod: { type: "string" },
          quantity: { type: "integer" },
        },
        required: ["session_token", "id_prod", "quantity", "group_id"],
      },
      "delete-product-shoppingCart": {
        type: "object",
        properties: {
          session_token: { type: "string" },
          group_id: { type: "string" },
          id_prod: { type: "string" },
        },
        required: ["session_token", "id_prod", "group_id"],
      },
    },
  },
};
