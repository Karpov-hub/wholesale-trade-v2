const router = require("./main.router");
const controller = require("../controller/product.controller");

router.post("/get-product", controller.getProducts);
router.post("/get-product-details", controller.GetProductDetails);
router.post("/create-product", controller.createProduct);
router.post("/delete-product", controller.deleteProduct);
router.post("/update-product", controller.updateProduct);
router.post("/create-product-rating", controller.addProductRating);
router.post("/update-product-discount", controller.addProductDiscount);
module.exports = router;
