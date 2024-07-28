const logger = require("../utils/logger")("error-handler");
module.exports = (err, req, res, next) => {
  logger.error(err);
  const statusCode = err.statusCode || 500;
  const stack = err.stack || "Internal server error";
  res.status(statusCode).send({
    status: "error",
    statusCode,
    stack,
  });
};
