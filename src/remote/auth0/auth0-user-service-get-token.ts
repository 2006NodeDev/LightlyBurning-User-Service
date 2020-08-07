import { auth0BaseClient, updateUserServiceJWT } from ".";
import { logger, errorLogger } from "../../utils/loggers";


export async function auth0UserServiceGetToken(){

    try{

        let body = {
            client_id: process.env['AUTH0_CLIENT_ID'],
            client_secret: process.env['AUTH0_CLIENT_SECRET'],
            audience: "https://lb-demos.us.auth0.com/api/v2/",
            grant_type: "client_credentials"
        }



        let res = await auth0BaseClient.post('/oauth/token', body)
        updateUserServiceJWT(res.data.access_token)
        // logger.info(res.data.access_token)
    } catch(e){
        logger.debug(e)
        errorLogger.error(e)
        let error:any = new Error(e.message)
        error.status = e.status
        throw error
    }


}