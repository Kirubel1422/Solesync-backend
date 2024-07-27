const { admin } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.use("/api/v1/auth", require("./auth.router"));
router.use("/api/v1/user", admin, require("./user.router"));
router.use("/api/v1/category", admin, require("./category.router"));
router.use("/api/v1/color", admin, require("./color.router"));
router.use("/api/v1/size", admin, require("./size.router"));
router.use("/api/v1/order", require("./order.router"));
// router.use("/api/v1/payment", require("./payment.router"));
router.use("/api/v1/favourite", require("./favourite.router"));
router.use("/api/v1/cart", require("./cart.router"));
router.use("/api/v1/image", require("./image.router"));
router.use("/api/v1/product", require("./product.router"));

module.exports = router;
