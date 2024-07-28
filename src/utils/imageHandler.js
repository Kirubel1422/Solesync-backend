const crypto = require("crypto");
const path = require("path");
const logger = require("../utils/logger")("imageHandler");

module.exports = (req, res, next) => {
  const { imgFiles } = req.files;
  let images = [];

  if (imgFiles.length === undefined) {
    if (
      !path.extname(imgFiles.name) ||
      !path.extname(imgFiles.name).match(/\.(jpg|jpeg|png)$/i)
    ) {
      const err = new Error("Incorrect mime type.");
      err.statusCode = 400;
      next(err);
    }
    const name = crypto.randomUUID() + path.extname(imgFiles.name);
    console.log(name);
    imgFiles.mv(
      path.resolve(__dirname, `../../public/images/${name}`),
      (err) => {
        if (err) {
          const err = new Error("Error uploading image");
          next(err);
        }
      }
    );

    images.push(`image/getImage/${name}`);
  } else {
    for (const img of imgFiles) {
      if (!img || !path.extname(img.name).match(/\.(jpg|jpeg|png)$/i)) {
        const err = new Error("Incorrect mime type.");
        err.statusCode = 400;
        next(err);
      }

      const name = crypto.randomUUID() + path.extname(img.name);
      img.mv(path.resolve(__dirname, `../public/images/${name}`), (err) => {
        if (err) {
          const err = new Error("Error uploading image");
          next(err);
        }
      });

      images.push(`image/getImage/${name}`);
    }
  }

  req.body.images = images;
  next();
};
