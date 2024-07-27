const router = require("express").Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.route("/getAllCategories").get(getAllCategories);
router.route("/getCategoryById/:id").get(getCategoryById);
router.route("/createCategory").post(createCategory);
router.route("/updateCategory/:id").put(updateCategory);
router.route("/deleteCategory/:id").delete(deleteCategory);

module.exports = router;
