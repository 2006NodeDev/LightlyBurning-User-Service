import axios from 'axios'

//an optional env for host address or localhost default
let baseURL = 'https://lightlyburning.us.auth0.com'

let jwt = ''

export const auth0BaseClient = axios.create({
    baseURL,
    headers:{
        'Content-Type': 'application/json',
    },
})


//make an interceptor to add the jwt to requests to auth0
auth0BaseClient.interceptors.request.use((config)=>{
    if(config.url !== '/oauth/token'){
        config.headers.Authorization = `Bearer ${jwt}`
    }
    return config
})


export function updateJwt(newToken:string){
    jwt = newToken
}