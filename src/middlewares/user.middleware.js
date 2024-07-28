const { authValidator } = require("../utils/validator");
const logger = require("../utils/logger");
const User = require("../models/user");

exports.createUserMiddleware = (req, res, next) => {
  const { firstName, email, password, role } = req.body;

  if (!firstName || !email || !password || !role)
    return res.status(400).json({
      message: "All fields are required!",
    });

  if (!authValidator(email, password))
    return res.status(400).json({
      message: "Fields not meet the requirements",
    });

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });

  next();
};
