import { AppError } from "../../errors/error";
import { TLogInUser } from "./auth.interface";
import {UserModel} from "../user/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";


const logInUserWithCreds = async (loginCreds: TLogInUser) => {
    console.log('login req from :', loginCreds)

    const isUserExists = await UserModel.isUserExists(loginCreds?.email);
    // console.log('blocked:',isUserExists?.isBlocked)

    const passwordMatched = await UserModel.isPasswordMatched(loginCreds?.email, loginCreds?.password );
    console.log("pass:",passwordMatched)


    if (!isUserExists) {
        throw new AppError(401, "User doesn't exist!");
    }
    if (isUserExists?.isBlocked) {
        throw new AppError(401, "User is blocked. Can't login!");
    }
    if (!passwordMatched) {
        throw new AppError(401, "Invalid credentials!");
    }


    // ✅ Generate access token after successful login

    const accessToken = jwt.sign(
        {
          email: loginCreds?.email,
          role: isUserExists?.user?.role,
        },
        config.jwt_access_secret as string,
        { expiresIn: "1d" }
      );




      return(
        accessToken 
      )

    

}


export const AuthServices = {
    logInUserWithCreds
}




