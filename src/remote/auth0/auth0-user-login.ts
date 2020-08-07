import {auth0BaseClient} from '.'
import { errorLogger, logger } from '../../utils/loggers'


export async function auth0UserLogin(username:string, password:string){
    try{
        let body = {
            client_id:process.env['AUTH0_CLIENT_ID'],
            client_secret:process.env['AUTH0_CLIENT_SECRET'],
            audience:'lightlyburning.js-army.com',
            grant_type:'password',
            username,
            password
        }

    
        let res = await auth0BaseClient.post('/oauth/token', body)
        logger.info(res.data)
    } catch(e){
        logger.debug(e)
        errorLogger.error(e)
    }

   

}