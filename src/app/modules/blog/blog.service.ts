import { AppError } from "../../errors/error";
import { UserModel } from "../user/user.model";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";


const createBlogIntoDB = async(blogData: TBlog)=>{

    const userExists = await UserModel.findById(blogData.author);
    if (!userExists) {
        throw new AppError(400 ,"Author does not exist.");
    }

    const result = await BlogModel.create(blogData);
    return  result;
} 


const updateBlogIntoDB = async(blogId:string, updatedBlogData: Partial<TBlog>)=>{
    return BlogModel.findByIdAndUpdate(
        blogId,
        { $set: updatedBlogData },
        { new: true}
    )
}




export const BlogService = {
    createBlogIntoDB,
    updateBlogIntoDB,

}

 