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
const { admin, user } = require("../middlewares/auth.middleware");

router.route("/getAllCarts").get(admin, getAllCarts);
router.route("/getCartById/:id").get(admin, getCartById);
router.route("/createCart").post(createCart);
router.route("/getSelfCart").get(user, getSelfCart);
router.route("/updateCart/:id").put(updateCart);
router.route("/deleteCart/:id").delete(deleteCart);
router.route("/getCartByUserId/:id").get(admin, getCartByUserId);
router.route("/addProductToCart").patch(addProductToCart);
router.route("/removeProductFromCart").patch(removeProductFromCart);

module.exports = router;
