import {auth0BaseClient} from '.'
import { errorLogger, logger } from '../../utils/loggers'
import { User } from '../../models/User'


export async function auth0CreateUser(newUser:User){
    try{
        let body = {
            email:newUser.email,
            email_verified: false,
            verify_email: true,
            password:newUser.password,
            connection: 'Username-Password-Authentication'
        }

    
        let res = await auth0BaseClient.post('/api/v2/users', body)
        let domain = newUser.email.split('@').pop()
        if(domain === 'revature.com'){
            await auth0BaseClient.post(`/api/v2/users/${res.data.user_id}/roles`, {
                roles:[
                    'rol_2N5gUR1ctgZ1biOq'
                ]
            })
        } else {
            await auth0BaseClient.post(`/api/v2/users/${res.data.user_id}/roles`, {
                roles:[
                    'rol_PnwllsYGQo17QylJ'
                ]
            })
        }
        newUser.userId = res.data.user_id
        return newUser
    } catch(e){
        logger.debug(e)
        errorLogger.error(e)
        throw e
    }

   

}