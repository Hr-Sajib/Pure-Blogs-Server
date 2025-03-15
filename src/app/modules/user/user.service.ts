import { AppError } from "../../errors/error";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async(userData: TUser)=>{
    const result = await UserModel.create(userData);
    return  result;
} 

const blockUserIntoDB =async (userId:string) => {
    const userExists = await UserModel.findById(userId);
    if(!userExists){
        throw new AppError(400,"User doesnt exist!")
    }

    return UserModel.findByIdAndUpdate(
        userId,
        { $set: {isBlocked : true} }, 
        { new: true}
    )
}



export const UserServices = {
    createUserIntoDB,
    blockUserIntoDB
}