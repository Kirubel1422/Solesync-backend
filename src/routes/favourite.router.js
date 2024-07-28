const router = require("express").Router();
const { admin, either } = require("../middlewares/auth.middleware");

const {
  getAllFavourites,
  getFavouriteById,
  createFavourite,
  updateFavourite,
  deleteFavourite,
  getSelfFavourite,
  addToFavourite,
  removeFromFavourite,
} = require("../controllers/favorite.controller");

router.route("/getAllFavourites").get(admin, getAllFavourites);
router.route("/getFavouriteById/:id").get(admin, getFavouriteById);
router.route("/getSelfFavorites").get(getSelfFavourite);
router.route("/createFavourite").post(either, createFavourite);
router.route("/updateFavourite/:id").put(either, updateFavourite);
router.route("/deleteFavourite/:id").delete(either, deleteFavourite);
router.route("/addToFavourite").patch(either, addToFavourite);
router.route("/removeFromFavourite").patch(either, removeFromFavourite);

module.exports = router;
