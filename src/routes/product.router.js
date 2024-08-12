const router = require("express").Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  search,
  getPopularProducts,
  getTotalProducts,
} = require("../controllers/product.controller");
const { admin } = require("../middlewares/auth.middleware");
const imageHandler = require("../utils/imageHandler");

router.route("/getAllProducts").get(getAllProducts);
router.route("/getProductById/:id").get(getProductById);
router.route("/getPopularProducts").get(getPopularProducts);
router.route("/getTotalProducts").get(getTotalProducts);
router.route("/createProduct").post(admin, imageHandler, createProduct);
router.route("/updateProduct/:id").put(admin, imageHandler, updateProduct);
router.route("/deleteProduct/:id").delete(admin, deleteProduct);
router.route("/search").get(admin, search);

module.exports = router;
