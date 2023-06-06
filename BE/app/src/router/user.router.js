const router = require("./main.router");
const controller = require("../controller/user.controller");
//Авторизация
router.post("/auth/signup", controller.signup);
router.post("/auth/signin", controller.signin);
router.post("/auth/refresh-token", controller.refreshToken);
router.post("/auth/logout", controller.logout);
//Профиль
// router.post("/profile/get-users", controller.getUsers);
router.post("/profile/get-data", controller.getProfile);
router.post("/profile/update-user", controller.updateUser);
router.post("/profile/update-user-password", controller.updateUserPassword);
router.post("/profile/delete-user", controller.deleteUser);
//Избранное
router.post(
  "/favorite/get-product-favorite",
  controller.getProductFavoriteList
);
router.post("/favorite/add-product-favorite", controller.addProductFavorite);
router.post(
  "/favorite/delete-product-favorite",
  controller.deleteProductFavorite
);
router.post("/favorite/move-favorite-login", controller.moveFavoriteOnLogin);
//Корзина
router.post(
  "/shoppingCart/get-product-shoppingCart",
  controller.getProductShoppingCartList
);
router.post(
  "/shoppingCart/add-product-shoppingCart",
  controller.addProductShoppingCart
);
router.post(
  "/shoppingCart/delete-product-shoppingCart",
  controller.deleteProductShoppingCart
);
router.post("/favorite/move-cart-login", controller.moveCartOnLogin);
//Покупка
router.post("/buy-products", controller.buyProducts);
router.post("/get-notifications", controller.getNotifications);

module.exports = router;
