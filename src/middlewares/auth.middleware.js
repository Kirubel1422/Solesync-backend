const passport = require("passport");

exports.admin = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role != "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = user.id;
    next();
  })(req, res, next);
};

exports.user = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role != "user") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = user.id;
    next();
  })(req, res, next);
};
