const {
  getAllColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
} = require("../controllers/color.controller");

const router = require("express").Router();

router.route("/getAllColors").get(getAllColors);
router.route("/getColorById/:id").get(getColorById);
router.route("/createColor").post(createColor);
router.route("/updateColor/:id").put(updateColor);
router.route("/deleteColor/:id").delete(deleteColor);

module.exports = router;
