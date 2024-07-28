const router = require("express").Router();
const { either, admin } = require("../middlewares/auth.middleware");

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getSelfOrder,
  search,
  searchByDate,
  filterByPage,
} = require("../controllers/order.controller");

router.route("/getAllOrders").get(either, getAllOrders);
router.route("/getOrderById/:id").get(either, getOrderById);
router.route("/createOrder").post(either, createOrder);
router.route("/updateOrder/:id").put(either, updateOrder);
router.route("/deleteOrder/:id").delete(either, deleteOrder);
router.route("/getSelfOrder").get(either, getSelfOrder);
router.route("/search").get(admin, search);
router.route("/searchByDate").get(admin, searchByDate);
router.route("/queryWithPage").get(admin, filterByPage);

module.exports = router;
