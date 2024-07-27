const crypto = require("crypto");
const path = require("path");
module.exports = (req, res, next) => {
  const imgFiles = req.files;
  let images = [];

  for (const img of imgFiles) {
    if (!img || !path.extname(img.originalname).match(/\.(jpg|jpeg|png)$/i)) {
      return res.status(400).json({ message: "Incorrect mime type." });
    }

    const name = crypto.randomUUID() + path.extname(img.originalname);
    img.mv(path.resolve(__dirname, `../public/images/${name}`), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error uploading image" });
      }
    });
    images.push(name);
  }

  req.body.images = images;
  next();
};
