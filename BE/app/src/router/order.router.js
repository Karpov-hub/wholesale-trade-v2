const router = require("./main.router");
const controller = require("../controller/order.controller");

router.post("/get-orders", controller.getOrders);
router.post("/get-orders-moderator", controller.getOrdersFModerators);
router.post("/get-order-details", controller.GetOrderDetails);
router.post("/update-status", controller.updateStatus);
module.exports = router;
