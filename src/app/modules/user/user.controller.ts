import { RequestHandler } from "express";
import { AppError } from "../../errors/error";
import sendResponse from "../../utils/sendResponse";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { UserServices } from "./user.service";

const createUser: RequestHandler = tryCatchAsync(async (req, res, next) => {
    const result = await UserServices.createUserIntoDB(req.body);

    if(!result){
        throw new AppError(400,"User not registerd. Error occured!")
    }

    sendResponse(res, { 
        success: true,
        statusCode: 201,
        message: "User registered successfully.",
        data: result
    });
});

export const UserController = {
    createUser,
}