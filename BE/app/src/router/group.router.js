const router = require("./main.router");
const controller = require("../controller/group.controller");

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

// //Избранное
// router.post(
//   "/favorite/get-product-favorite",
//   controller.getProductFavoriteList
// );
// router.post("/favorite/add-product-favorite", controller.addProductFavorite);
// router.post(
//   "/favorite/delete-product-favorite",
//   controller.deleteProductFavorite
// );

// //Корзина
// router.post(
//   "/shoppingCart/get-product-shoppingCart",
//   controller.getProductShoppingCartList
// );
// router.post(
//   "/shoppingCart/add-product-shoppingCart",
//   controller.addProductShoppingCart
// );
// router.post(
//   "/shoppingCart/delete-product-shoppingCart",
//   controller.deleteProductShoppingCart
// );

module.exports = router;
