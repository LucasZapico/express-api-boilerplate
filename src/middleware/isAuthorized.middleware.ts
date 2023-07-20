require("module-alias/register");
import createError from "http-errors";
import jwt from "jsonwebtoken";
import verifyToken from "src/utils/jwt");

import logger from "src/config/winston.config";
import log from "src/config/cliLogger.config";

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    logger.info("missing auth token");
    return res.status(401).json({ message: "Access Denied" });
  }
  const cleanToken = token.replace("Bearer", "").trim();
  try {
    const verified = verifyToken(cleanToken);
    return next();
  } catch (err) {
    logger.error("Error with token auth");
    return next(createError(401, ));
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  const cleanToken = token.replace("Bearer", "").trim();

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    log("ran is admin");
    const verified = verifyToken(cleanToken);

    if (verified && verified.role === "SUPERADMIN") {
      next();
    } else {
      errorLogger("not authorized admin - BlueMonkeyMakes integrations");
      return createError(400, "not authorized");
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

