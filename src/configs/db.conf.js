const mongoose = require("mongoose");
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const logger = require("../utils/logger")("db.conf.js");

module.exports = mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
  .then((res) => {
    if (res.connections[0].readyState) {
      console.log("Database connected");
    } else if (res.connections[0].readyState === 0) {
      console.log("Database disconnected");
    }
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
