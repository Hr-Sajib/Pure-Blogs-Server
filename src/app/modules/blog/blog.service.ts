import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../errors/error";
import { UserModel } from "../user/user.model";
import { blogSearchableFields } from "./blog.constants";
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


const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(
        BlogModel.find().populate('author'), 
        query
    )
    .search(blogSearchableFields)   
    .filter()
    .sort()
    .paginate()
    .fields(); 


    const result = await blogQuery.modelQuery;  
    return result;
};



const updateBlogIntoDB = async(blogId:string, updatedBlogData: Partial<TBlog>)=>{
    return BlogModel.findByIdAndUpdate(
        blogId,
        { $set: updatedBlogData },
        { new: true}
    )
}



const deleteBlogFromDB =async (blogId:string) => {

    const foundBlog = await BlogModel.findById(blogId)

    if(!foundBlog){
        throw new AppError(400, "Blog not found!")
    }

    const result = await BlogModel.findOneAndDelete({_id: blogId});
    return result;
}




export const BlogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogsFromDB,
    deleteBlogFromDB

}

 