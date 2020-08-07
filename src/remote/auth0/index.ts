import axios from 'axios'

//an optional env for host address or localhost default
let baseURL = 'https://lb-demos.us.auth0.com'


let userServiceJwt;


export const auth0BaseClient = axios.create({
    baseURL,
    headers:{
        'Content-Type': 'application/json',
    },
})



export function updateUserServiceJWT(newToken:string){
    userServiceJwt = newToken
}

// modify every single request that goes out from this client
auth0BaseClient.interceptors.request.use((config)=>{
    if(config.url !== '/oauth/token'){//if we aren;t sending a request to get a new token
        config.headers.Authorization = `Bearer ${userServiceJwt}`//add on our authorization
    }
    return config//the config to use after modification
})
