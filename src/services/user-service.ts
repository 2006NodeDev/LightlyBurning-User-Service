import { getAllUsers, getUserById, saveOneUser } from "../daos/SQL/user-dao";
import { User } from "../models/User";
import { saveProfilePicture } from "../daos/Cloud-Storage/user-images";
import { bucketBaseUrl } from "../daos/Cloud-Storage";
import { expressEventEmitter, customExpressEvents } from "../event-listeners";
import { logger, errorLogger } from "../utils/loggers";
import { auth0CreateNewUser } from "../remote/auth0/auth0-create-new-user";





//the most basic service function you will see
//all it does is call the dao
// its easier to expand a function that already exists instead of inserting a new function in to the mix
export async function getAllUsersService(): Promise<User[]> {
    return await getAllUsers()
}


export async function getUserByIDService(id: number): Promise<User> {
    return await getUserById(id)
}

export async function saveOneUserService(newUser: User, password: string): Promise<User> {
    //two major process to manage in this function
    try {
        //try to save user to auth0
        let newUserId = await auth0CreateNewUser(newUser, password)
        //update id
        newUser.userId = newUserId

        let base64Data, contentType;
        //get potential image link
        if (newUser.image) {
            [base64Data, contentType] = processImage(newUser.image)
            newUser.image = `${bucketBaseUrl}/users/${newUser.username}/profile.${contentType}`
        }
        //save user to db
        let savedUser = await saveOneUser(newUser)

        //save picture to cloud sql
        if (base64Data) {
            await saveProfilePicture(contentType, base64Data, `users/${newUser.username}/profile.${contentType}`)
        }

        //EMIT NEW USER CREATED EVENT
        expressEventEmitter.emit(customExpressEvents.NEW_USER, newUser)
        return savedUser
    } catch (e) {
        logger.error(e)
        errorLogger.error(e)
        throw e
    }

    //if we can't save the user in the db, don't save the picture
    //if we do save the user and the picture save fails - pretend that nothing happened ( you should probably update the user to set the image to null)

}

function processImage(image: string) {
    let [dataType, imageBase64Data] = image.split(';base64,')
    let contentType = dataType.split('/').pop()// split our string that looks like data:image/ext into ['data:image' , 'ext]
    return [imageBase64Data, contentType]
}


