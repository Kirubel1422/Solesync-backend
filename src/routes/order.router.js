const router = require("express").Router();

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
} = require("../controllers/order.controller");

router.route("/getAllOrders").get(getAllOrders);
router.route("/getUserOrders/:id").get(getUserOrders);
router.route("/getOrderById/:id").get(getOrderById);
router.route("/createOrder").post(createOrder);
router.route("/updateOrder/:id").put(updateOrder);
router.route("/deleteOrder/:id").delete(deleteOrder);

module.exports = router;
