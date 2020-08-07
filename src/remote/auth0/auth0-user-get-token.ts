import { auth0BaseClient,} from ".";
import { logger, errorLogger } from "../../utils/loggers";


export async function auth0UserGetToken(username:string, password:string){

    try{

        let body = {
            client_id: process.env['AUTH0_CLIENT_ID'],
            client_secret: process.env['AUTH0_CLIENT_SECRET'],
            audience: "lightlyburning.js-army.com",
            grant_type: "password",
            username,
            password
        }



        let res = await auth0BaseClient.post('/oauth/token', body)
        return res.data.access_token
        // logger.info(res.data.access_token)
    } catch(e){
        logger.debug(e)
        errorLogger.error(e)
        logger.info(e.status)
        let error:any = new Error(e.message)
        error.status = e.status
        throw error
    }


}