const logger = require("../utils/logger")("error-handler");
module.exports = (err, req, res, next) => {
  logger.error(err);
  console.log(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).send({
    status: "error",
    statusCode,
    message,
  });
};
