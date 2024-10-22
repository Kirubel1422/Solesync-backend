const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passportLocal = require("passport-local");
const User = require("../models/user");
const genToken = require("../utils/jwt");
const { authValidator } = require("../utils/validator");
const logger = require("../utils/logger")("passport.conf");

module.exports = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.id);

        if (!user) {
          return done(null, false);
        }

        return done(null, { id: user._id, role: user.role });
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.use(
    "local-login",
    new passportLocal.Strategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const validate = await user.isValidPassword(password);
          if (!validate) {
            return done(null, false, { message: "Wrong password" });
          }

          const token = genToken(user.role, user.id);
          return done(null, { user, token });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "local-register",
    new passportLocal.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
      },
      async (req, email, password, done) => {
        const { firstName } = req.body;
        try {
          logger.info("Registering user");
          if (!firstName) {
            logger.error("First name is missing");
            return done(null, false, { message: "First name is required" });
          }

          const user = await User.findOne({ email });
          if (user) {
            logger.error("User already exists");
            return done(null, false, { message: "User already exists" });
          }

          if (!authValidator(email, password)) {
            logger.error("Fields not meet the requirements");
            return done(null, false, {
              message: "Fields not meet the requirements",
            });
          }

          const newUser = await User.create({
            firstName,
            email,
            password,
          });
          const token = genToken(newUser.role, newUser.id);

          return done(null, { user: newUser, token });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  return passport.initialize();
};
