const router = require("express").Router();

const {
  getAllSizes,
  getSizeById,
  createSize,
  updateSize,
  deleteSize,
} = require("../controllers/size.controller");

router.route("/getAllSizes").get(getAllSizes);
router.route("/getSizeById/:id").get(getSizeById);
router.route("/createSize").post(createSize);
router.route("/updateSize/:id").put(updateSize);
router.route("/deleteSize/:id").delete(deleteSize);

module.exports = router;
