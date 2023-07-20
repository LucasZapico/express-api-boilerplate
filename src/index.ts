import DefaultEnv from "src/config/env.config"
// express
import express, { Request, Response , NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser  from "body-parser";
import compression from "compression";
import createError, { HttpError } from "http-errors";
import routes from "src/routes/index";
// logger
import log from "src/config/cliLogger.config"
import morgan, { StreamOptions } from "morgan";
import logger from "src/config/winston.config";
import errorHandler from "src/middleware/errorHandler.middleware";
import morganMiddleware from "src/middleware/morgan.middleware";

const app = express();

const { NODE_ENV, BASE_URL, PORT, API_VERSION, SERVER_SECRET } = DefaultEnv

/*
 **
 **   middleware
 * */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
if (NODE_ENV !== "development") {
  app.use(compression()); // Compress all routes
}

// init routes
app.use(`/api/${API_VERSION}`, routes);

/*
 **
 ** INIT ROUTE
 **/
 app.get("/", (req: Request, res: Response) => {
  const message = `index route for Digital Sparrow Notion Service ${API_VERSION}` 
  log(message)
  return res
    .status(200)
    .json({ message });
});

// Define a route handler that throws an http-errors error
app.use((req: Request, res: Response, next: NextFunction) => {
  const message = "404 error catcher"
  logger.log({
    level: "error",
    message: message,
  });
  log({
    message: message, 
  }, { language: "json"})
  next(createError(404, 'Not Found'));
});

// error handler
app.use(errorHandler)





/*
 **
 **   set port or export on env
 * */
if (NODE_ENV === "development") {
  app.listen(PORT, () => {
    logger.verbose("app restart");
    log(
      `Welcome a simple express typescript starter ${API_VERSION} is listening on port ${PORT}.\n`
    );
  });
  log(`

NODE_ENV: ${NODE_ENV}
----
PORT: ${PORT}
BASE_URL: ${BASE_URL}
API_VERSION: ${API_VERSION}
SERVER_SECRET: ${SERVER_SECRET}
----

  `, {language: 'yaml'});
} else {
  // export default app;
}
