import { Types } from "mongoose";
import { TUser } from "../user/user.interface";

export type TBlog = {
    title: string,
    content: string,
    author: Types.ObjectId,
    isPublished: boolean

}

