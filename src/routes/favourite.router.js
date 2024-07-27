const router = require("express").Router();

const {
  getAllFavourites,
  getFavouriteById,
  createFavourite,
  updateFavourite,
  deleteFavourite,
} = require("../controllers/favorite.controller");

router.route("/getAllFavourites").get(getAllFavourites);
router.route("/getFavouriteById/:id").get(getFavouriteById);
router.route("/createFavourite").post(createFavourite);
router.route("/updateFavourite/:id").put(updateFavourite);
router.route("/deleteFavourite/:id").delete(deleteFavourite);

module.exports = router;
