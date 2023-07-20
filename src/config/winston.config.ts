import path from "path";
import { createLogger, transport, transports, format } from  "winston";
import DefaultEnv from "src/config/env.config";

const { printf, combine, timestamp, label, prettyPrint, colorize, align, json, cli } = format;

/**
 * log filters for single level logging
 */
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const infoAndWarnFilter = format((info, opts) => {
  return info.level === "info" || info.level === "warn" ? info : false;
});

const errorFilter = format((info, opts) => {
  return info.level === "error" ? info : false;
});

const debugFilter = format((info, opts) => {
  return info.level === "debug" ? info : false;
});

const verboseFilter = format((info, opts) => {
  return info.level === "verbose" ? info : false;
});

/**
 * Log formats 
 */
const defaultFormat = format.combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // colorize({ all: true }),
  json(),
  // cli(),
  label(),
  printf(({ level, message, label, timestamp }) => `${timestamp} ${level} ${message}`)
)

const defaultFormatCli = format.combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  // Tell Winston that the logs must be colored
  // format.colorize({ all: true }),
  // Define the format of the message showing the timestamp, the level and the message
  printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ), 
  cli(),
)

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const optionsOne = {
  file: {
    level: "debug",
    filename: "./logs/debug.log.json",
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    format: defaultFormat,
    maxFiles: 10,
  },
};

const errorLoggerConfig = {
  file: {
    level: "error",
    filename: "./logs/error.log.json",
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    format: format.combine(errorFilter(), defaultFormat, json()),
    maxFiles: 10,
    colorize: false,
  },
};


const infoWarnLoggerConfig = {
  file: {
    level: "info",
    filename: "./logs/info-warn.log.json",
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    format: format.combine(infoAndWarnFilter(), defaultFormat, json()),
    maxFiles: 10,
  },
};

const verboseLoggerConfig = {
  file: {
    level: "verbose",
    filename: "./logs/verbose.log.json",
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    format: format.combine(verboseFilter(), defaultFormat, json()),
    maxFiles: 10,
  },
};

const appLoggerConfig = {
  file: {
    level: "silly",
    filename: "./logs/app.log.json",
    handleExceptions: false,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: format.combine(defaultFormat, json())
    
  },
  console: {
    prettyPrint: true,
    level: "http",
    format: defaultFormatCli,
    handleExceptions: true,
  },
};

const initTransports = [
  new transports.Console(appLoggerConfig.console),
  new transports.File(errorLoggerConfig.file),
  new transports.File(infoWarnLoggerConfig.file),
  new transports.File(verboseLoggerConfig.file),
  new transports.File(appLoggerConfig.file),

  // new transports.File(optionsOne.file),
  // new transports.File({ level: "error", filename: "./logs/error.log.json" }),

  // new transports.Console({ level: 'silly' }),
  // new transports.File({ filename: './logs/app.log', level: 'info' }),
]

const logger = createLogger({
  levels,
  defaultMeta: { application: 'integration api'  },
  transports: initTransports,
  exitOnError: false, // do not exit on handled exceptions
});

// TODO 
// logger.stream = {
//   write(message: any, encoding: any) {
//     logger.info(message);
//   },
// };

export default logger;
