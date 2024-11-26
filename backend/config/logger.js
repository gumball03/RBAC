const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
  transports: [
    new transports.MongoDB({
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
      db: process.env.DB_CONNECTION,
      collection: "logger",
    }),
  ],
});

module.exports = logger;
