const db = require("@app/db");
const crypto = require("crypto");
const config = require("@app/config");
const redis = require("@app/redis");
const { v4: uuidv4 } = require("uuid");
async function createGroup(req, res) {
  try {
    const sessionToken = req.body.session_token;
    const userId = await redis.get(sessionToken);

    if (!userId) {
      return res.send({
        code: "SESSIONEXPIRED",
      });
    }

    const { name, description } = req.body;

    const existingGroup = await db.group.findOne({
      where: { name },
    });

    if (existingGroup) {
      return res.send({
        code: "GROUPEXIST",
        message: "Group with the same name already exists",
      });
    }

    const newGroup = await db.group.create({
      id: uuidv4(),
      name,
      description,
      admin_id: userId,
      users: JSON.stringify([{ id: "" }]),
      ctime: new Date(),
      mtime: new Date(),
    });

    return res.send({
      success: true,
      message: "Group was created",
      group_id: newGroup.id,
    });
  } catch (error) {
    console.error("Error creating group:", error);
    return res.status(500).send({
      code: "ERROR",
      message: "An error occurred while creating the group",
    });
  }
}

async function deleteGroup(req, res) {
  try {
    const { group_id, session_token } = req.body;
    let user_id = await redis.get(session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    // Проверка, существует ли группа с указанным идентификатором
    const group = await db.group.findOne({
      where: { id: group_id },
    });
    if (!group) {
      return res.send({
        code: "GROUPNOTFOUND",
        message: "Group not found",
      });
    }

    // Проверка прав доступа: только администратор может удалить группу
    if (group.admin_id !== user_id) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Unauthorized: You are not the administrator of this group",
      });
    }

    // Удаление группы
    await db.group.destroy({
      where: { id: group_id },
    });

    return res.send({
      success: true,
      message: "Group was deleted",
    });
  } catch (error) {
    console.error("Error deleting group:", error);
    return res.status(500).send({
      code: "ERROR",
      message: "An error occurred while deleting the group",
    });
  }
}

async function getGroupInfo(req, res) {
  try {
    const { group_id, session_token } = req.body;
    let user_id = await redis.get(session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    // Поиск группы по идентификатору
    const group = await db.group.findOne({
      where: { id: group_id },
    });
    if (!group) {
      return res.send({
        code: "GROUPNOTFOUND",
        message: "Group not found",
      });
    }

    const users = JSON.parse(group.users);
    let accessDenied = true;

    for (let i = 0; i < users.length; i++) {
      if (user_id === users[i]) {
        access = false;
        break;
      }
    }

    if (accessDenied) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied : you are not a member of this group.",
      });
    }

    // Формирование объекта с информацией о группе
    const groupInfo = {
      id: group.id,
      name: group.name,
      description: group.description,
      users: users,
    };

    return res.send({
      success: true,
      message: "Group information retrieved",
      group: groupInfo,
    });
  } catch (error) {
    console.error("Error retrieving group information:", error);
    return res.status(500).send({
      code: "ERROR",
      message: "An error occurred while retrieving group information",
    });
  }
}

async function updateGroupData(req, res) {
  try {
    const { group_id, name, description, session_token } = req.body;

    // Проверка наличия идентификатора пользователя в Redis
    const userId = await redis.get(session_token);
    if (!userId) {
      return res.send({
        code: "SESSIONEXPIRED",
        message: "Session expired",
      });
    }

    // Поиск группы по идентификатору
    const group = await db.group.findOne({
      where: { id: group_id },
    });
    if (!group) {
      return res.send({
        code: "GROUPNOTFOUND",
        message: "Group not found",
      });
    }

    // Проверка прав доступа: только администратор может изменять данные группы
    if (group.admin_id !== userId) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Unauthorized: You are not the administrator of this group",
      });
    }

    // Обновление данных группы
    await group.update({
      name: name || group.name, // Изменение имени группы, если указано
      description: description || group.description, // Изменение описания группы, если указано
      mtime: new Date(), // Обновление времени изменения
    });

    return res.send({
      success: true,
      message: "Group data updated",
    });
  } catch (error) {
    console.error("Error updating group data:", error);
    return res.status(500).send({
      code: "ERROR",
      message: "An error occurred while updating group data",
    });
  }
}
//Участники
async function getGroupMembers(req, res) {
  try {
    const { group_id, session_token } = req.body;
    let user_id = await redis.get(session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    // Поиск группы по идентификатору
    const group = await db.group.findOne({
      where: { id: group_id },
    });
    if (!group) {
      return res.send({
        code: "GROUPNOTFOUND",
        message: "Group not found",
      });
    }

    const users = JSON.parse(group.users);
    let accessDenied = true;

    for (let i = 0; i < users.length; i++) {
      if (user_id === users[i]) {
        access = false;
        break;
      }
    }

    if (accessDenied) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied : you are not a member of this group.",
      });
    }

    return res.send({
      success: true,
      message: "Group information retrieved",
      members: users,
    });
  } catch (error) {
    console.error("Error retrieving group information:", error);
    return res.status(500).send({
      code: "ERROR",
      message: "An error occurred while retrieving group information",
    });
  }
}

async function addGroupMember(req, res) {
  try {
    const { group_id, user_id, session_token } = req.body;
    const admin_id = await redis.get(session_token);

    if (!admin_id) {
      return res.send({
        code: "SESSIONEXPIRED",
      });
    }

    const group = await db.group.findOne({
      where: { id: group_id },
    });

    if (!group) {
      return res.send({
        code: "GROUPNOTFOUND",
        message: "Group not found",
      });
    }

    if (group.admin_id !== admin_id) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Unauthorized: You are not the administrator of this group",
      });
    }

    const members = JSON.parse(group.users);
    members.push(user_id);

    await db.group.update(
      {
        users: JSON.stringify(members),
      },
      {
        where: {
          id: group_id,
        },
      }
    );

    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false });
  }
}

async function deleteGroupMember(req, res) {
  try {
    const { group_id, user_id, session_token } = req.body;
    let admin_id = await redis.get(session_token);
    if (!admin_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    // Проверка, существует ли группа с указанным идентификатором
    const group = await db.group.findOne({
      where: { id: group_id },
    });
    if (!group) {
      return res.send({
        code: "GROUPNOTFOUND",
        message: "Group not found",
      });
    }

    // Проверка прав доступа: только администратор может добавить участника
    if (group.admin_id !== admin_id) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Unauthorized: You are not the administrator of this group",
      });
    }

    let members = group.users;
    members = JSON.parse(members);
    for (let i = 0; i < members.length; i++) {
      if (members[i] == user_id) {
        arr.splice(i, 1);
        break;
      }
    }
    members = JSON.stringify(members);

    await db.group.update(
      {
        users: members,
      },
      {
        where: {
          id: group_id,
        },
      }
    );
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function transferAdminRights(req, res) {
  try {
    const { group_id, user_id, session_token } = req.body;
    const admin_id = await redis.get(session_token);
    if (!admin_id) {
      return res.send({
        code: "SESSIONEXPIRED",
        message: "Session expired",
      });
    }

    // Проверка, является ли текущий пользователь администратором группы
    const group = await db.group.findOne({
      where: { id: group_id, admin_id: admin_id },
    });
    if (!group) {
      return res.send({
        code: "FORBIDDEN",
        message: "You are not the admin of the group",
      });
    }

    // Обновление администратора группы
    await db.group.update({ admin_id: user_id }, { where: { id: group_id } });

    return res.send({
      success: true,
      message: "Admin rights transferred successfully",
    });
  } catch (e) {
    console.error("Error when transferring admin rights:", e);
    return res.send({
      success: false,
      message: "Error when transferring admin rights",
    });
  }
}

//Чаты
async function getGroupChatsList(req, res) {
  try {
    const { group_id, session_token } = req.body;
    let user_id = await redis.get(session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    // Поиск группы по идентификатору
    const group = await db.group.findOne({
      where: { id: group_id },
    });
    if (!group) {
      return res.send({
        code: "GROUPNOTFOUND",
        message: "Group not found",
      });
    }

    const users = JSON.parse(group.users);
    let accessDenied = true;
    for (let i = 0; i < users.length; i++) {
      if (user_id === users[i]) {
        access = false;
        break;
      }
    }
    if (accessDenied) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied : you are not a member of this group.",
      });
    }

    // Получение списка чатов группы
    const chats = await db.chat.findAll({
      where: { group_id: group_id },
      attributes: ["id", "name"],
    });

    return res.send({
      success: true,
      chats: chats,
    });
  } catch (e) {
    console.error("Error when getting group chats list:", e);
    return res.send({
      success: false,
      message: "Error when getting group chats list",
    });
  }
}

async function createChat(req, res) {
  try {
    const { chatName, group_id, session_token } = req.body;
    const admin_id = await redis.get(session_token);

    if (!admin_id) {
      return res.send({
        code: "SESSIONEXPIRED",
        message: "Session expired",
      });
    }

    const group = await db.group.findOne({
      where: { id: group_id, admin_id },
    });

    if (!group) {
      return res.send({
        code: "FORBIDDEN",
        message: "You are not the admin of the group",
      });
    }

    await db.chat.create({
      name: chatName,
      group_id,
      messages: "[]",
      ctime: new Date(),
      mtime: new Date(),
    });

    return res.send({
      success: true,
    });
  } catch (error) {
    console.error("Error when creating chat:", error);
    return res.send({
      success: false,
      message: "Error when creating chat",
    });
  }
}

async function deleteChat(req, res) {
  try {
    const { chat_id, session_token } = req.body;
    // Получение пользователя по токену сеанса
    const chat = await db.chat.findOne({
      where: { id: chat_id },
    });
    if (await checkAdminAccess(session_token, chat.group_id)) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied : you are not a member of this group.",
      });
    }

    // Удаление чата
    await chat.destroy();

    return res.send({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (e) {
    console.error("Error when deleting chat:", e);
    return res.send({
      success: false,
      message: "Error when deleting chat",
    });
  }
}

async function updateChatName(req, res) {
  try {
    const { chat_id, newChatName, session_token } = req.body;
    // Поиск чата для обновления названия
    const chat = await db.chat.findOne({
      where: { id: chat_id },
    });
    if (await checkAdminAccess(session_token, chat.group_id)) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied : you are not a member of this group.",
      });
    }

    // Обновление названия чата
    await chat.update({
      name: newChatName,
    });

    return res.send({
      success: true,
      message: "Chat name updated successfully",
    });
  } catch (e) {
    console.error("Error when updating chat name:", e);
    return res.send({
      success: false,
      message: "Error when updating chat name",
    });
  }
}

//Сообщения
async function getMassagesList(req, res) {
  try {
    const { chat_id, session_token } = req.body;
    if (
      req.body.start === undefined ||
      req.body.limit === undefined ||
      (req.body.start === undefined && req.body.limit === undefined)
    ) {
      req.body.start = 0;
      req.body.limit = 24;
    }

    const chat = await db.chat.findOne({
      where: { id: chat_id },
    });
    if (await checkGroupMembership(session_token, chat.group_id)) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied : you are not a member of this group.",
      });
    }

    return res.send({
      success: true,
      rows: JSON.parse(chat.messages).slice(req.body.start, req.body.limit),
      count: JSON.parse(chat.messages).length,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function addMassages(req, res) {
  try {
    const { chat_id, mes, session_token } = req.body;
    const chat = await db.chat.findOne({
      where: { id: chat_id },
    });
    if (await checkGroupMembership(session_token, chat.group_id)) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied : you are not a member of this group.",
      });
    }

    messages = JSON.parse(chat.messages);
    messages.push({
      id: uuidv4(),
      user_id: user_id,
      message: mes,
      ctime: new Date(),
    });
    messages = JSON.stringify(messages);

    await db.chat.update(
      {
        messages: messages,
      },
      {
        where: {
          id: chat_id,
        },
      }
    );
    return res.send({
      success: true,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function deleteMassages(req, res) {
  try {
    const { chat_id, message_id, session_token } = req.body;
    const chat = await db.chat.findOne({
      where: { id: chat_id },
    });

    if (await checkGroupMembership(session_token, chat.group_id)) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied : you are not a member of this group.",
      });
    }

    messages = JSON.parse(chat.messages);
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id == message_id) {
        if (messages[i].user_id == (await redis.get(session_token))) {
          arr.splice(i, 1);
        } else {
          return res.send({
            code: "ACCESSDENIED",
            message: "Access denied : you cannot delete this message.",
          });
        }
        break;
      }
    }
    messages = JSON.stringify(messages);

    await db.chat.update(
      {
        messages: messages,
      },
      {
        where: {
          id: chat_id,
        },
      }
    );
    return res.send({
      success: true,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function updateMessages(req, res) {
  try {
    const { chat_id, message_id, session_token, updated_message } = req.body;
    const chat = await db.chat.findOne({
      where: { id: chat_id },
    });

    if (!(await checkGroupMembership(session_token, chat.group_id))) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied: you are not a member of this group.",
      });
    }

    let messages = JSON.parse(chat.messages);
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === message_id) {
        if (messages[i].user_id === (await redis.get(session_token))) {
          messages[i].message = updated_message;
        } else {
          return res.send({
            code: "ACCESSDENIED",
            message: "Access denied: you cannot update this message.",
          });
        }
        break;
      }
    }
    const updatedMessages = JSON.stringify(messages);

    await db.chat.update(
      {
        messages: updatedMessages,
      },
      {
        where: {
          id: chat_id,
        },
      }
    );
    return res.send({
      success: true,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to update messages",
    });
  }
}

async function searchMessages(req, res) {
  try {
    const { chat_id, search_query, session_token } = req.body;
    const chat = await db.chat.findOne({
      where: { id: chat_id },
    });

    if (!(await checkGroupMembership(session_token, chat.group_id))) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied: you are not a member of this group.",
      });
    }

    const messages = JSON.parse(chat.messages);
    const filteredMessages = messages.filter((message) => {
      return message.body.includes(search_query);
    });

    return res.send({
      success: true,
      messages: filteredMessages,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to search messages",
    });
  }
}

async function shareProduct(req, res) {
  try {
    const { chat_id, product_id, session_token } = req.body;
    const chat = await db.chat.findOne({
      where: { id: chat_id },
    });

    if (await checkGroupMembership(session_token, chat.group_id)) {
      return res.send({
        code: "ACCESSDENIED",
        message: "Access denied: you are not a member of this group.",
      });
    }

    const user_id = await redis.get(session_token);
    const product = await db.product.findOne({
      where: { id: product_id },
      attributes: ["id", "name", "image", "price", "discount", "rating"],
    });

    const message = {
      id: uuidv4(),
      user_id: user_id,
      product: product,
      ctime: new Date(),
    };
    if (req.body.mes) message.body = req.body.mes;

    let messages = JSON.parse(chat.messages);
    messages.push(message);
    messages = JSON.stringify(messages);

    await db.chat.update(
      {
        messages: messages,
      },
      {
        where: {
          id: chat_id,
        },
      }
    );

    return res.send({
      success: true,
      message: "Product shared successfully",
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to share product",
    });
  }
}

// //Избранное
// async function getProductFavoriteList(req, res) {
//   try {
//     let user_id = await redis.get(req.body.session_token);
//     if (!user_id)
//       return res.send({
//         code: "SESSIONEXPIRED",
//       });

//     if (!req.body.start) {
//       req.body.start = 0;
//     }
//     if (!req.body.limit) {
//       req.body.limit = 25;
//     }

//     let user = await db.user.findOne({
//       where: { id: user_id },
//       attributes: ["favorites"],
//     });
//     let favorites = JSON.parse(user.favorites).slice(
//       req.body.start,
//       req.body.limit
//     );
//     let products = [];
//     for (let i = 0; i < favorites.length; i++) {
//       let product = await db.product.findOne({
//         where: { id: favorites[i] },
//         attributes: [
//           "id",
//           "name",
//           "image",
//           "price",
//           "discount",
//           "rating",
//           "product_quantity",
//         ],
//       });

//       products.push(product);
//     }
//     return res.send({
//       success: true,
//       rows: products,
//       count: JSON.parse(user.favorites).length,
//     });
//   } catch (e) {
//     return res.send({
//       success: false,
//       message: "Error when trying to get a list",
//     });
//   }
// }

// async function addProductFavorite(req, res) {
//   try {
//     let user_id = await redis.get(req.body.session_token);
//     if (!user_id)
//       return res.send({
//         code: "SESSIONEXPIRED",
//       });

//     let user = await db.user.findOne({
//       where: { id: user_id },
//       attributes: ["favorites"],
//     });

//     let favoriteList = JSON.parse(user.favorites);
//     favoriteList.push(req.body.id_prod);
//     favoriteList = JSON.stringify(favoriteList);

//     await db.user.update(
//       {
//         favorites: favoriteList,
//       },
//       {
//         where: {
//           id: user_id,
//         },
//       }
//     );
//     return res.send({ success: true });
//   } catch (e) {
//     return res.send({ success: false });
//   }
// }

// async function deleteProductFavorite(req, res) {
//   try {
//     let user_id = await redis.get(req.body.session_token);
//     if (!user_id)
//       return res.send({
//         code: "SESSIONEXPIRED",
//       });

//     let user = await db.user.findOne({
//       where: { id: user_id },
//       attributes: ["favorites"],
//     });

//     let favoriteList = JSON.parse(user.favorites);

//     for (let i = 0; i < favoriteList.length; i++) {
//       if (favoriteList[i] == req.body.id_prod) {
//         favoriteList.splice(i, 1);
//         break;
//       }
//     }
//     favoriteList = JSON.stringify(favoriteList);

//     await db.user.update(
//       {
//         favorites: favoriteList,
//       },
//       {
//         where: {
//           id: user_id,
//         },
//       }
//     );
//     return res.send({ success: true });
//   } catch (e) {
//     return res.send({ success: false });
//   }
// }

// //Корзина
// async function getProductShoppingCartList(req, res) {
//   try {
//     let user_id = await redis.get(req.body.session_token);
//     if (!user_id)
//       return res.send({
//         code: "SESSIONEXPIRED",
//       });

//     if (!req.body.start) {
//       req.body.start = 0;
//     }
//     if (!req.body.limit) {
//       req.body.limit = 25;
//     }

//     let user = await db.user.findOne({
//       where: { id: user_id },
//       attributes: ["shopping_cart"],
//     });
//     let shoppingCartList = JSON.parse(user.shopping_cart);
//     let products = [];
//     let totalCost = 0; // Переменная для хранения итоговой стоимости
//     for (let i = 0; i < shoppingCartList.length; i++) {
//       let product = await db.product.findOne({
//         where: { id: shoppingCartList[i].id },
//         attributes: [
//           "id",
//           "name",
//           "image",
//           "price",
//           "discount",
//           "rating",
//           "product_quantity",
//         ],
//       });
//       product.product_quantity = shoppingCartList[i].quantity;
//       products.push(product);
//       // Расчет стоимости товара с учетом количества в корзине
//       let itemCost = product.price * shoppingCartList[i].quantity;
//       totalCost += itemCost;
//     }

//     return res.send({
//       success: true,
//       rows: products.slice(req.body.start, req.body.limit),
//       count: JSON.parse(user.shopping_cart).length,
//       total_price: totalCost, // Добавляем итоговую стоимость в ответ
//     });
//   } catch (e) {
//     return res.send({
//       success: false,
//       message: "Error when trying to get a list",
//     });
//   }
// }

// async function addProductShoppingCart(req, res) {
//   try {
//     let user_id = await redis.get(req.body.session_token);
//     if (!user_id)
//       return res.send({
//         code: "SESSIONEXPIRED",
//       });

//     let user = await db.user.findOne({
//       where: { id: user_id },
//       attributes: ["shopping_cart"],
//     });

//     let shoppingCartList = JSON.parse(user.shopping_cart);

//     // Проверяем, есть ли уже объект с указанным id в корзине
//     let existingProduct = shoppingCartList.find(
//       (item) => item.id === req.body.id_prod
//     );

//     if (existingProduct) {
//       // Объект уже существует, увеличиваем его quantity на указанное значение
//       existingProduct.quantity += req.body.quantity;
//     } else {
//       // Объект не существует, добавляем новый элемент в корзину
//       shoppingCartList.push({
//         id: req.body.id_prod,
//         quantity: req.body.quantity,
//       });
//     }

//     shoppingCartList = JSON.stringify(shoppingCartList);

//     await db.user.update(
//       {
//         shopping_cart: shoppingCartList,
//       },
//       {
//         where: {
//           id: user_id,
//         },
//       }
//     );
//     return res.send({ success: true });
//   } catch (e) {
//     return res.send({ success: false });
//   }
// }

// async function deleteProductShoppingCart(req, res) {
//   try {
//     let user_id = await redis.get(req.body.session_token);
//     if (!user_id)
//       return res.send({
//         code: "SESSIONEXPIRED",
//       });

//     let user = await db.user.findOne({
//       where: { id: user_id },
//       attributes: ["shopping_cart"],
//     });

//     let shoppingCartList = JSON.parse(user.shopping_cart);

//     for (let i = 0; i < shoppingCartList.length; i++) {
//       console.log(shoppingCartList[i]);
//       if (shoppingCartList[i].id == req.body.id_prod) {
//         shoppingCartList.splice(i, 1);
//         break;
//       }
//     }
//     shoppingCartList = JSON.stringify(shoppingCartList);

//     await db.user.update(
//       {
//         shopping_cart: shoppingCartList,
//       },
//       {
//         where: {
//           id: user_id,
//         },
//       }
//     );
//     return res.send({ success: true });
//   } catch (e) {
//     return res.send({ success: false });
//   }
// }

//проверка прав доступа участника
async function checkGroupMembership(session_token, group_id) {
  let user_id = await redis.get(session_token);
  if (!user_id)
    return res.send({
      code: "SESSIONEXPIRED",
    });

  // Проверка, является ли пользователь участником группы, связанной с чатом
  const group = await db.group.findOne({
    where: { id: group_id },
  });
  if (!group) {
    return res.send({
      code: "FORBIDDEN",
      message: "You are not the admin of the group",
    });
  }
  const users = JSON.parse(group.users);
  for (let i = 0; i < users.length; i++) {
    if (user_id === users[i]) {
      return false;
    }
  }
  return true;
}
//проверка прав доступа админа
async function checkAdminAccess(session_token, group_id) {
  let admin_id = await redis.get(session_token);
  if (!admin_id)
    return res.send({
      code: "SESSIONEXPIRED",
    });

  const group = await db.group.findOne({
    where: { id: group_id, admin_id: admin_id },
  });
  if (group) {
    return false;
  }
  return true;
}

module.exports = {
  createGroup,
  deleteGroup,
  getGroupInfo,
  updateGroupData,
  //Участники
  getGroupMembers,
  addGroupMember,
  deleteGroupMember,
  transferAdminRights,
  //Чаты
  getGroupChatsList,
  createChat,
  deleteChat,
  updateChatName,
  //Сообщения
  getMassagesList,
  addMassages,
  deleteMassages,
  updateMessages,
  searchMessages,
  shareProduct,
  // //Избранное
  // getProductFavoriteList,
  // addProductFavorite,
  // deleteProductFavorite,
  // //Корзина
  // getProductShoppingCartList,
  // addProductShoppingCart,
  // deleteProductShoppingCart,
};
