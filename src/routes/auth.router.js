const {
  signup,
  signin,
  updateProfile,
} = require("../controllers/auth.controller");
const { either } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/updateProfile").put(either, updateProfile);
module.exports = router;
