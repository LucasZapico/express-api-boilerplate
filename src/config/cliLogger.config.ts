import { highlight } from "cli-highlight";
import DefaultEnv from "src/config/env.config";

const { NODE_ENV } = DefaultEnv;

const log = (message: any, setting?: object) => {
  if (NODE_ENV !== "production") {
    console.log(highlight(message, setting));
  }
};

export default log;
