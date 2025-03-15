import { AppError } from "../../errors/error";
import { TLogInUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import {UserModel} from "../user/user.model";

const logInUserWithCreds = async (loginCreds: TLogInUser) => {
    console.log('login req from :', loginCreds)

    const isUserExists = await UserModel.isUserExists(loginCreds?.email);
    console.log('blocked:',isUserExists?.isBlocked)

    const passwordMatched = await UserModel.isPasswordMatched(loginCreds?.email, loginCreds?.password );
    console.log("pass:",passwordMatched)

}


export const AuthServices = {
    logInUserWithCreds
}




