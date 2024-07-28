const router = require("express").Router();

const { getImage } = require("../controllers/image.controller");

router.route("/getImage/:img").get(getImage);

module.exports = router;
