const jwt = require("jsonwebtoken");

module.exports = (role, id) => {
  return jwt.sign({ role, id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
