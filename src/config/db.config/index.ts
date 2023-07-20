import { PrismaClient, Prisma } from "@prisma/client";
import log from "src/config/cliLogger.config";
import logger from "src/config/winston.config";
import DefaultEnv from "src/config/env.config";

const filepath = "./base.db";

// logger.error({message: "error connecting to sqlite db",errMessage: error.message});
// log("Connection with SQLite has been established");

// declare global {
//   var prisma: {
//     prisma: any;
//   }

declare global {
  // eslint-disable-next-line
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (DefaultEnv.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  const globalPrisma = globalThis.prisma
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient({
      errorFormat: "pretty",
      log: [
        {
          level: "info",
          emit: "event",
        },
        {
          level: "query",
          emit: "event",
        },
        {
          level: "warn",
          emit: "event",
        },
      ],
    });
  }

  prisma = globalThis.prisma;
}

export default prisma

/*
 undefined	If it's not defined, the default is colorless.
pretty	Enables pretty error formatting.
colorless (default)	Enables colorless error formatting.
minimal	Enables minimal error formatting.
*/
