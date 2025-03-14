import { UserModel } from "../user/user.model";
import { TBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";


const createBlogIntoDB = async(blogData: TBlog)=>{

    const userExists = await UserModel.findById(blogData.author);
    if (!userExists) {
        throw new Error("Author does not exist.");
    }



    const result = await BlogModel.create(blogData);
    return  result;
} 




export const BlogService = {
    createBlogIntoDB,
   

}


// const updateBlogIntoDB = async(blogId:string, updatedBlogData: Partial<TBlog>)=>{
//     return BlogModel.findByIdAndUpdate(
//         blogId,
//         { $set: updatedBlogData },
//         { new: true}
//     )
// }

 // updateBlogIntoDB,