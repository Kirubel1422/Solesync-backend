const validator = require("validator");

exports.authValidator = (email, password) => {
  if (validator.isStrongPassword(password) && validator.isEmail(email)) {
    return true;
  }

  return false;
};
