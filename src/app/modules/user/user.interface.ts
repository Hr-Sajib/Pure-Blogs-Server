import { Model } from "mongoose";

export interface TUser {
    name: string,
    email: string,
    password: string,
    role: 'user',
    isBlocked: boolean,
}


// Define UserModel interface with statics
export interface TUserModel extends Model<TUser> {
    isUserExists(email: string): Promise<{ user: TUser; isBlocked: boolean }>;
    isPasswordMatched(email: string, password: string): Promise<boolean>;
}