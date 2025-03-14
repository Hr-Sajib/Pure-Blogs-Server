import { TLogInUser, TUser } from "./auth.interface";
import { UserModel } from "./auth.model";

const createUserIntoDB = async(userData: TUser)=>{
    const result = await UserModel.create(userData);
    return  result;
} 

const logInUserWithCreds = async (loginCreds: TLogInUser) => {
    console.log('login req from :', loginCreds)
}


export const UserServices = {
    createUserIntoDB,
    logInUserWithCreds
}