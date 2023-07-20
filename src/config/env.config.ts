import * as dotenv from 'dotenv' 
import path from "path";
if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: path.resolve(`./.env.${process.env.NODE_ENV}`),
  });
} 


const DefaultEnv = { 
  NODE_ENV: process.env.NODE_ENV || "development",
  BASE_URL: process.env.BASE_URL || "localhost",
  PORT: process.env.PORT || 3333,
  API_VERSION: process.env.API_VERSION || `v1`,
  SERVER_SECRET: process.env.SERVER_SECRET || 'asM4EYF1NmcmqzRHbR64t8',
  SEQ_API_KEY: process.env.SEQ_API_KEY|| "",
  SEQ_URL: process.env.SEQ_URL || "http://127.0.0.1:5341"
}

export default DefaultEnv 



