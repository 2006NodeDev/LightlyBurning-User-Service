export class UserDTO {
    user_id:string
    username:string
    password:string
    email:string
    role:string
    role_id:number
    image?:string//this is a path to the file in cloud storage
}