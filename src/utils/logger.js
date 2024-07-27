const { format, createLogger, transports } = require("winston");
const { timestamp, combine, colorize, printf } = format;

// For dev environment
const devLogger = (source) => {
  return createLogger({
    level: "info",
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.splat(),
      format.errors({ stack: true }),
      colorize(),
      printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${source}] ${level}: ${message}`;
      })
    ),

    defaultMeta: { label: source },
    transports: [new transports.Console()],
  });
};

const now = new Date();
const appFilename = `logs/${now}.log`;
const exceptionFilename = `logs/exception-${now}.log`;
const rejectionFilename = `logs/rejection-${now}.log`;

const prodLogger = (source) => {
  return createLogger({
    level: "info",
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.splat(),
      format.errors({ stack: true }),
      printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${source}] ${level}: ${message}`;
      })
    ),
    defaultMeta: { label: source },
    transports: [new transports.File({ filename: appFilename })],
    exceptionHandlers: [new transports.File({ filename: exceptionFilename })],
    rejectionHandlers: [new transports.File({ filename: rejectionFilename })],
  });
};

module.exports = process.env.NODE_ENV == "production" ? prodLogger : devLogger;
