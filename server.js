require("dotenv").config();
require("./src/configs/db.conf");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const errorHandler = require("./src/middlewares/errorHandler");
const app = express();

app.use(express.static("public"));
app.use("", cors());
app.use(
  cors({
    // origin: [process.env.CLIENT_URL],
    origin: "*",
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(require("./src/configs/passport.conf")(passport));
app.use(require("./src/routes"));

app.use(
  fileUpload({
    abortOnLimit: true,
    responseOnLimit: "File size limit has been reached",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const status = 404;
  const message = "Not found";
  const Error = new Error(message);
  Error.statusCode = status;
  next(Error);
});

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
