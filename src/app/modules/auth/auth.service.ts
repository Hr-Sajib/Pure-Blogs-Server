import { TLogInUser } from "./auth.interface";


const logInUserWithCreds = async (loginCreds: TLogInUser) => {
    console.log('login req from :', loginCreds)
}


export const AuthServices = {
    logInUserWithCreds
}