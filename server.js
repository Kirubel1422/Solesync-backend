require("dotenv").config();
require("./src/configs/db.conf");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const errorHandler = require("./src/middlewares/errorHandler");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));
app.options("*", cors());

app.use(
  cors({
    // origin: [process.env.CLIENT_URL],
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  fileUpload({
    abortOnLimit: true,
    responseOnLimit: "File size limit has been reached",
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(require("./src/configs/passport.conf")(passport));
app.use(require("./src/routes"));

app.use((req, res, next) => {
  const status = 404;
  const message = "Not found";
  const error = new Error(message);
  error.statusCode = status;
  next(error);
});

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
