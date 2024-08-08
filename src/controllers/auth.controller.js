const logger = require("../utils/logger")("auth.controller");
const passport = require("passport");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  passport.authenticate("local-register", (err, result, info) => {
    if (err) {
      logger.error(err);
      return next(err);
    }
    if (!result) {
      logger.error(info);
      return res.status(400).json({ message: info.message });
    }

    res.json(result);
  })(req, res, next);
};

exports.signin = (req, res, next) => {
  passport.authenticate("local-login", (err, result, info) => {
    if (err) {
      logger.error(err);
      return next(err);
    }

    if (!result) {
      logger.error(info);
      return res.status(400).json({ message: info.message });
    }

    res.json(result);
  })(req, res, next);
};

exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.body.user, req.body, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      logger.error(err);
      next(err);
    });
};
