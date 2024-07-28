const {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { createUserMiddleware } = require("../middlewares/user.middleware");

const router = require("express").Router();

router.route("/getUserById/:id").get(getUserById);
router.route("/getAllUsers").get(getAllUsers);
router.route("/createUser").post(createUserMiddleware, createUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

module.exports = router;
