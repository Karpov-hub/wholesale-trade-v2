const router = require("./main.router");
const controller = require("../controller/group.controller");

router.post("/get", controller.getGroup);
router.post("/create", controller.createGroup);
router.post("/delete", controller.deleteGroup);
router.post("/get-info", controller.getGroupInfo);
router.post("/update-info", controller.updateGroupData);

//Участники
router.post("/members/get-members", controller.getGroupMembers);
router.post("/members/add", controller.addGroupMember);
router.post("/members/delete", controller.deleteGroupMember);
router.post("/members/transfer-admin-rights", controller.transferAdminRights);

//Чаты
router.post("/chats/get-chats", controller.getGroupChatsList);
router.post("/chats/create", controller.createChat);
router.post("/chats/delete", controller.deleteChat);
router.post("/chats/update-name", controller.updateChatName);

//Сообщения
router.post("/chats/messages/get-messages", controller.getMassagesList);
router.post("/chats/messages/add", controller.addMassages);
router.post("/chats/messages/delete", controller.deleteMassages);
router.post("/chats/messages/update", controller.updateMessages);
router.post("/chats/messages/search", controller.searchMessages);
router.post("/chats/messages/share-product", controller.shareProduct);

//Избранное
router.post(
  "/favoriteG/get-product-favorite",
  controller.getProductFavoriteListG
);
router.post("/favoriteG/add-product-favorite", controller.addProductFavoriteG);
router.post(
  "/favoriteG/delete-product-favorite",
  controller.deleteProductFavoriteG
);

//Корзина
router.post(
  "/shoppingCartG/get-product-shoppingCart",
  controller.getProductShoppingCartListG
);
router.post(
  "/shoppingCartG/add-product-shoppingCart",
  controller.addProductShoppingCartG
);
router.post(
  "/shoppingCartG/delete-product-shoppingCart",
  controller.deleteProductShoppingCartG
);

module.exports = router;
