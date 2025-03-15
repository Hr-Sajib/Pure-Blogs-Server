import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { AuthServices } from "./auth.service";


const logInUser: RequestHandler = tryCatchAsync(async (req, res) => {

    const result = await AuthServices.logInUserWithCreds(req.body);

    sendResponse(res, { 
        success: true,
        statusCode: 201,
        message: "Logged in successfully.",
        data: result
    });
});


export const AuthController = {
    logInUser
}

