import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { UserServices } from "./auth.service";



const createUser: RequestHandler = tryCatchAsync(async (req, res, next) => {
    const result = await UserServices.createUserIntoDB(req.body);

    sendResponse(res, { 
        success: true,
        statusCode: 201,
        message: "User registered successfully.",
        data: result
    });
});


const logInUser: RequestHandler = tryCatchAsync(async (req, res, next) => {

    const result = await UserServices.logInUserWithCreds(req.body);

    sendResponse(res, { 
        success: true,
        statusCode: 201,
        message: "User logged in successfully.",
        data: result
    });
});



export const UserController = {
    createUser,
    logInUser
}