import morgan from "morgan";
import logger from "src/config/winston.config";

const stream =  {
  // Configure Morgan to use our custom logger with the http severity
  write: (message: string) => logger.http(message.trim()),
}

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  'combined',
  // ':status :method :url - :response-time ms',
  // ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);

export default morganMiddleware
