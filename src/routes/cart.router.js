const router = require("express").Router();

const {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  getCartByUserId,
  addProductToCart,
  removeProductFromCart,
  getSelfCart,
} = require("../controllers/cart.controller");
const { admin, user, either } = require("../middlewares/auth.middleware");

router.route("/getAllCarts").get(admin, getAllCarts);
router.route("/getCartById/:id").get(admin, getCartById);
router.route("/createCart").post(either, createCart);
router.route("/getSelfCart").get(either, getSelfCart);
router.route("/updateCart/:id").put(either, updateCart);
router.route("/deleteCart/:id").delete(either, deleteCart);
router.route("/getCartByUserId/:userId").get(admin, getCartByUserId);
router.route("/addProductToCart").patch(either, addProductToCart);
router.route("/removeProductFromCart").patch(either, removeProductFromCart);

module.exports = router;
