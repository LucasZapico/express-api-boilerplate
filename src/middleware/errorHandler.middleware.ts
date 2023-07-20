import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import winston from "src/config/winston.config";
import log from "src/config/cliLogger.config";
import logger from "src/config/winston.config";

// TODO: decide if patter conflicts or is redundant
// error handler
const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const httpMessage = createError(status).message;
  const errMessage = err.message || "default message";
  logger.error({
    status: `${status}`,
    message: `${errMessage}`,
  });
  // set locals, only providing error in development
  // log status and error message in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.json({ status: status, httpMessage, message: errMessage });
};

export default errorHandler;
