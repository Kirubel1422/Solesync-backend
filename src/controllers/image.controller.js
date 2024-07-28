const path = require("path");

exports.getImage = (req, res, next) => {
  const name = req.params.img;
  const img = path.resolve(__dirname, `../../public/images/${name}`);

  if (img) {
    return res.sendFile(img);
  }

  return res.status(404).end();
};
