import { RequestHandler } from "express";
import mongoose from "mongoose";
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


const blockUser: RequestHandler = tryCatchAsync(async (req, res, next) => {  
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError(400,"User ID is not valid!"); 
    };


    const blockedUser = await UserServices.blockUserIntoDB(userId);

    if(!blockedUser) {
        throw new AppError(400,"User not blocked. Error occured!");
    }

    res.status(200).json({
        success: true,
        message: "User blocked successfully!",
        data: blockedUser
    });
});

export const UserController = {
    createUser,
    blockUser
}