import * as dotenv from 'dotenv' 
import path from "path";

if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: path.resolve(`./.env.${process.env.NODE_ENV}`),
  });
}
import log from "src/config/cliLogger.config"

const {
  BASE_URL,
  PORT,
  NODE_ENV,
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_API_URL,
  ZOHO_ACCOUNT_API_URL,
  API_VERSION,
} = process.env;

const SERVER_URL = `http://${BASE_URL}:${PORT}`;

const SCOPE = `ZohoCRM.modules.ALL`


const baseConfig = {
  SCOPE: SCOPE,
  ZOHO_API_URL: ZOHO_API_URL,
  ZOHO_ACCOUNT_API_URL: ZOHO_ACCOUNT_API_URL,
  CLIENT_ID: ZOHO_CLIENT_ID,
  CLIENT_SECRET: ZOHO_CLIENT_SECRET,
  REDIRECT_URI: `${SERVER_URL}/api/${API_VERSION}/auth/zoho/callback`,
  SERVER_URL,
  authBaseUrl: "https://accounts.zoho.com",
};

const zohoConfig = {
  ...baseConfig,
  AUTH_URL: `${baseConfig.ZOHO_ACCOUNT_API_URL}/oauth/v2/auth?scope=${SCOPE}&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${baseConfig.REDIRECT_URI}`,
};


export default zohoConfig;

/**
 * **
 * ** REFERENCE
 * **
 * ZOHO AUth URL 
 * "https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.users.ALL&client_id={client_id}&response_type=code&access_type={"offline"or"online"}&redirect_uri={redirect_uri}"
 
**
** REDRIECT URI FORMAT
** 
* redirect_uri=https://www.zylker.com/oauthredirect
 */