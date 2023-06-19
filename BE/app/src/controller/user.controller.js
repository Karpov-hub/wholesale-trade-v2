const db = require("@app/db");
const crypto = require("crypto");
const config = require("@app/config");
const redis = require("@app/redis");
//Профиль
async function signup(req, res) {
  try {
    const existUser = await db.user.findOne({
      where: { phone: req.body.phone },
    });

    if (existUser) {
      return res.send({
        code: "PHONEALREADYREGISTERED",
        message: "Sorry, you can't sign up with this phone number.",
      });
    }

    await db.user.create({
      password: crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("base64"),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      middle_name: req.body.middle_name,
      shopping_cart: "[]",
      favorites: "[]",
      delivery_address: "[]",
      notifications: JSON.stringify([
        {
          name: "Registration",
          description:
            "Welcome to our service. We hope that our services will be useful to you.",
        },
      ]),
      phone: req.body.phone,
      roll: req.body.roll ? 1 : undefined,
      ctime: Date.now(),
      mtime: Date.now(),
    });

    return res.send({
      success: true,
      message: "Successful registration.",
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Unforeseeable error.",
    });
  }
}

async function signin(req, res) {
  let user = await db.user.findOne({
    where: { phone: req.body.phone },
    attributes: ["id", "password"],
  });
  if (!user) return res.send({ code: "AUTHENTICATIONFAILED" });
  if (
    crypto.createHash("sha256").update(req.body.password).digest("base64") ==
    user.password
  ) {
    let session_token = crypto.randomBytes(30).toString("base64");
    await redis.set(session_token, user.get("id"), config.token_lifetime);
    return res.send({ success: true, session_token });
  } else {
    return res.send({ success: false, message: "Failed to authorize" });
  }
}

async function refreshToken(req, res) {
  if (await redis.get(req.body.session_token))
    return res.send({ success: true });
  return res.send({ success: false });
}

async function logout(req, res) {
  if (await redis.get(req.body.session_token)) {
    await redis.del(req.body.session_token);
    return res.send({ success: true });
  }
  return res.send({ success: false });
}

// async function getUsers(req, res) {
//   try {
//     const searchingOptions = {
//       attributes: [
//         "id",
//         "first_name",
//         "last_name",
//         "middle_name",
//         "phone",
//         "ctime",
//         "delivery_address",
//       ],
//     };
//     let id = req.body.id;
//     if (id != null) {
//       const user = await db.user.findOne({
//         where: { id: req.body.id },
//         attributes: searchingOptions.attributes,
//       });
//       return res.send({ user });
//     }
//     searchingOptions.offset = req.body.start;
//     searchingOptions.limit = req.body.limit;
//     let div = "DESC";
//     if (req.body.div != null) {
//       div = req.body.div;
//     }
//     if (req.body.field != null) {
//       searchingOptions.order = [[req.body.field, div]];
//     }
//     /*
//     if (filter.name != null)
//       searchingOptions.where = { name: { [Op.like]: `%${filter.name}%` } };
//     if (filter.email != null)
//       searchingOptions.where = { email: { [Op.like]: `%${filter.email}%` } };
//     */
//     const { count, rows } = await db.user.findAndCountAll(searchingOptions);
//     return res.send({ success: true, count, rows });
//   } catch (e) {
//     return res.send({ success: false });
//   }
// }

async function getProfile(req, res) {
  try {
    const user_id = await redis.get(req.body.session_token);

    if (!user_id) {
      return res.send({
        code: "SESSIONEXPIRED",
      });
    }

    const user = await db.user.findOne({
      where: { id: user_id },
      attributes: [
        "first_name",
        "last_name",
        "middle_name",
        "delivery_address",
        "phone",
        "ctime",
      ],
    });

    user.delivery_address = JSON.parse(user.delivery_address);

    return res.send({ success: true, data: user });
  } catch (error) {
    return res.send({ success: false });
  }
}

async function updateUser(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });
    let updatingOptions = { ...req.body };
    updatingOptions.mtime = Date.now();
    updatingOptions.delivery_address = JSON.stringify(
      req.body.delivery_address
    );
    await db.user.update(updatingOptions, {
      where: {
        id: user_id,
      },
    });
    return res.send({
      success: true,
      message: "User data was sucessfuly changed",
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "User data has not been successfully changed",
    });
  }
}

async function updateUserPassword(req, res) {
  try {
    let id = await redis.get(req.body.session_token);

    // let notifications = await createNotification({
    //   user_id: id,
    //   name: "Update Password",
    //   description: "Your account password has been changed",
    // });

    await db.user.update(
      {
        password: crypto
          .createHash("sha256")
          .update(req.body.password)
          .digest("base64"),
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.send({
      code: "SUCCESS",
      message: "Password was sucessfuly changed",
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Password has not been successfully changed",
    });
  }
}

async function deleteUser(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    await db.user.destroy({
      where: { id: user_id },
    });
    return res.send({ success: true, message: "User was deleted" });
  } catch (e) {
    return res.send({
      success: false,
      message: "The user has not been deleted",
    });
  }
}

//Избранное
async function getProductFavoriteList(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    if (
      req.body.start === undefined ||
      req.body.limit === undefined ||
      (req.body.start === undefined && req.body.limit === undefined)
    ) {
      req.body.start = 0;
      req.body.limit = 24;
    }

    let user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["favorites"],
    });
    let favorites = JSON.parse(user.favorites).slice(
      req.body.start,
      req.body.limit
    );
    let products = [];
    for (let i = 0; i < favorites.length; i++) {
      let product = await db.product.findOne({
        where: { id: favorites[i] },
      });

      products.push(product);
    }
    return res.send({
      success: true,
      rows: products,
      count: JSON.parse(user.favorites).length,
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function addProductFavorite(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    let user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["favorites"],
    });

    let favoriteList = JSON.parse(user.favorites);
    favoriteList.push(req.body.id_prod);
    favoriteList = JSON.stringify(favoriteList);

    await db.user.update(
      {
        favorites: favoriteList,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function deleteProductFavorite(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    let user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["favorites"],
    });

    let favoriteList = JSON.parse(user.favorites);

    for (let i = 0; i < favoriteList.length; i++) {
      if (favoriteList[i] == req.body.id_prod) {
        favoriteList.splice(i, 1);
        break;
      }
    }
    favoriteList = JSON.stringify(favoriteList);

    await db.user.update(
      {
        favorites: favoriteList,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function moveFavoriteOnLogin(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    let user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["favorites"],
    });

    let favoriteList = JSON.parse(user.favorites);
    let favoriteNL = req.body.favoriteList;
    favoriteList = favoriteList.concat(favoriteNL);

    // Удаление повторяющихся элементов
    favoriteList = favoriteList.filter((item, index) => {
      return favoriteList.indexOf(item) === index;
    });

    favoriteList = JSON.stringify(favoriteList);
    await db.user.update(
      {
        favorites: favoriteList,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

//Корзина
async function getProductShoppingCartList(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    if (
      req.body.start === undefined ||
      req.body.limit === undefined ||
      (req.body.start === undefined && req.body.limit === undefined)
    ) {
      req.body.start = 0;
      req.body.limit = 24;
    }
    let user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["shopping_cart"],
    });
    let shoppingCartList = JSON.parse(user.shopping_cart);
    let products = [];
    let totalCost = 0; // Переменная для хранения итоговой стоимости
    for (let i = 0; i < shoppingCartList.length; i++) {
      let product = await db.product.findOne({
        where: { id: shoppingCartList[i].id },
      });
      product.product_quantity = shoppingCartList[i].quantity;
      products.push(product);
      // Расчет стоимости товара с учетом количества в корзине
      let itemCost = product.price * shoppingCartList[i].quantity;
      totalCost += itemCost;
    }

    return res.send({
      success: true,
      rows: products.slice(req.body.start, req.body.limit),
      count: JSON.parse(user.shopping_cart).length,
      total_price: totalCost, // Добавляем итоговую стоимость в ответ
    });
  } catch (e) {
    return res.send({
      success: false,
      message: "Error when trying to get a list",
    });
  }
}

async function addProductShoppingCart(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    let user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["shopping_cart"],
    });

    let shoppingCartList = JSON.parse(user.shopping_cart);

    // Проверяем, есть ли уже объект с указанным id в корзине
    let existingProduct = shoppingCartList.find(
      (item) => item.id === req.body.id_prod
    );

    if (existingProduct) {
      // Объект уже существует, увеличиваем его quantity на указанное значение
      existingProduct.quantity += req.body.quantity;
    } else {
      // Объект не существует, добавляем новый элемент в корзину
      shoppingCartList.push({
        id: req.body.id_prod,
        quantity: req.body.quantity,
      });
    }

    shoppingCartList = JSON.stringify(shoppingCartList);

    await db.user.update(
      {
        shopping_cart: shoppingCartList,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function deleteProductShoppingCart(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    let user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["shopping_cart"],
    });

    let shoppingCartList = JSON.parse(user.shopping_cart);

    for (let i = 0; i < shoppingCartList.length; i++) {
      if (shoppingCartList[i].id == req.body.id_prod) {
        shoppingCartList.splice(i, 1);
        break;
      }
    }
    shoppingCartList = JSON.stringify(shoppingCartList);

    await db.user.update(
      {
        shopping_cart: shoppingCartList,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function moveCartOnLogin(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    let user = await db.user.findOne({
      where: { id: user_id },
      attributes: ["shopping_cart"],
    });

    let shoppingCartList = JSON.parse(user.shopping_cart);
    let shoppingCartNL = req.body.shoppingCartList;
    shoppingCartList = shoppingCartList.concat(shoppingCartNL);

    // Удаление повторяющихся элементов
    shoppingCartList = shoppingCartList.filter((item, index) => {
      return shoppingCartList.indexOf(item) === index;
    });

    shoppingCartList = JSON.stringify(shoppingCartList);
    await db.user.update(
      {
        shopping_cart: shoppingCartList,
      },
      {
        where: {
          id: user_id,
        },
      }
    );
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

//Покупка
async function buyProducts(req, res) {
  /* status
  0 - создана заяка
  1 - заявка подтверждена
  2 - Заказ отправлен
  3 - Заказ ожидает получения
  4 - заказ получен

  5 - Заказ отменён
  6 - Оформлен возврат
   */
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    let newOrder = await db.order.create({
      user_id,
      ordered_products: req.body.ordered_products,
      status: 0,
    });
    let notifications = await createNotification({
      user_id: id,
      name: "Buy Products",
      description: "You have placed an order.",
    });
    return res.send({ success: true });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function getNotifications(req, res) {
  try {
    let user_id = await redis.get(req.body.session_token);
    if (!user_id)
      return res.send({
        code: "SESSIONEXPIRED",
      });

    if (
      req.body.start === undefined ||
      req.body.limit === undefined ||
      (req.body.start === undefined && req.body.limit === undefined)
    ) {
      req.body.start = 0;
      req.body.limit = 24;
    }

    const user = await db.user.findOne({
      where: { id: req.body.user_id },
      attributes: ["notifications"],
    });

    return res.send({
      success: true,
      notificationList: JSON.parse(user.notifications).slice(
        req.body.start,
        req.body.limit
      ),
    });
  } catch (e) {
    return res.send({ success: false });
  }
}

async function createNotification(user_id, name, description) {
  let user = await db.user.findOne({
    where: { id: user_id },
    attributes: ["notifications"],
  });

  notifications = JSON.parse(user.notifications);
  notifications.push({
    name: name,
    description: description,
    ctime: Date.now(),
  });
  notifications = JSON.stringify(notifications);

  await db.user.update(
    {
      notifications: notifications,
    },
    {
      where: {
        id: user_id,
      },
    }
  );
  return notifications;
}

module.exports = {
  signup,

  signin,
  refreshToken,
  logout,
  //Профиль
  // getUsers,
  getProfile,
  updateUser,
  updateUserPassword,
  deleteUser,
  //Избранное
  getProductFavoriteList,
  addProductFavorite,
  deleteProductFavorite,
  moveFavoriteOnLogin,
  //Корзина
  getProductShoppingCartList,
  addProductShoppingCart,
  deleteProductShoppingCart,
  moveCartOnLogin,
  //Покупка
  buyProducts,
  getNotifications,
  createNotification,
};
