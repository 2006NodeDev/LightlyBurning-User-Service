import {auth0BaseClient, updateJwt} from '.'
import { errorLogger, logger } from '../../utils/loggers'

export async function userServiceAuthorize(){
    try{
        let body = {
            client_id:process.env['AUTH0_CLIENT_ID'],
            client_secret:process.env['AUTH0_CLIENT_SECRET'],
            audience:'https://lightlyburning.us.auth0.com/api/v2/',
            grant_type:'client_credentials'
        }
    
        let res = await auth0BaseClient.post('/oauth/token', body)
        updateJwt(res.data.access_token)
    } catch(e){
        logger.debug(e)
        errorLogger.error(e)
    }

   

}