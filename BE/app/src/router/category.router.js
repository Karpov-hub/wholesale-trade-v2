const router = require("./main.router");
const {
  // createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");

// router.post("/create-category", createCategory);
router.post("/get-categories", getCategories);
router.post("/update-category", updateCategory);
router.post("/delete-category", deleteCategory);

module.exports = router;
