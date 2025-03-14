import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { UserServices } from "./user.service";

const createUser: RequestHandler = tryCatchAsync(async (req, res, next) => {
    const result = await UserServices.createUserIntoDB(req.body);

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