const passport = require("passport");
const logger = require("../utils/logger")("auth.middleware");

exports.admin = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      logger.info("Unauthorized access request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role != "admin") {
      logger.info("Forbidden access request by user");
      return res.status(403).json({ message: "Forbidden" });
    }

    req.body.user = user.id;
    next();
  })(req, res, next);
};

exports.user = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      logger.info("Unauthorized access request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role != "user") {
      logger.info("Forbidden access request by admin");
      return res.status(403).json({ message: "Forbidden" });
    }

    req.body.user = user.id;
    next();
  })(req, res, next);
};

exports.either = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, result, info) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong!" });
    }

    if (!result) {
      return res.status(400).json(info);
    }

    req.body.user = result.id;
    console.log(req.body);
    next();
  })(req, res, next);
};
