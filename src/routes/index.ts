import express, { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import mdJson from "src/config/markdown.config";
import log from "src/config/cliLogger.config";
import errorHandler from "src/middleware/errorHandler.middleware";
import logger from "src/config/winston.config";

// import integrations from "src/routes/integrations.routes";

const routes = express.Router();

routes.get("/", (req: Request, res: Response) =>
   res.status(200).json({ message: "route index" })
);


// integration routes
// routes.use("/integrations", integrations)

// Define a route handler that throws an http-errors error
routes.get(
  "/test/500-error",
  (req: Request, res: Response, next: NextFunction) => {
    throw Error("internal server error TEST");
  }
);

routes.get(
  "/test/logger",
  (req: Request, res: Response, next: NextFunction) => {
    logger.error("error message");
    logger.warn("warn message");
    logger.info("info message");
    logger.verbose("verbose message");
    logger.debug("debug message");
    logger.silly("silly message");
    res.status(200).json({ message: "logger test" });
  }
);

routes.get(
  "/start",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({ message: "route start", data: "data" });
    } catch (err) {
      next(err);
    }
  }
);

export default routes;
