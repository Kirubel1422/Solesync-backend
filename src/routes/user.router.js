const {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.route("/getUserById/:id").get(getUserById);
router.route("/getAllUsers").get(getAllUsers);
router.route("/createUser").post(createUser);
router.route("/updateUser").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

module.exports = router;
