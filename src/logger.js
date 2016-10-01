import winston from "winston";
import winstonKoaLogger from "winston-koa-logger";

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      handleExceptions: true,
      humanReadableExceptions: true,
      humanReadableUnhandledException: true,
    })
  ],
  exitOnError: false
});

export default logger;
export const koaLogger = winstonKoaLogger(logger);
