import { RequestHandler } from "express";
import mongoose from "mongoose";
import { AppError } from "../../errors/error";
import sendResponse from "../../utils/sendResponse";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { BlogModel } from "./blog.model";
import { BlogService } from "./blog.service";
import  HttpStatus from "http-status";
import { TUser } from "../user/user.interface";

const createBlog: RequestHandler = tryCatchAsync(async (req, res) => {
    const result = await BlogService.createBlogIntoDB(req.body);

    sendResponse(res, { 
        success: true,
        statusCode: 201,
        message: "Blog is posted successfully.",
        data: result
    });
});

const getAllBlogs = tryCatchAsync( async(req, res)=>{ 
        
    const result = await BlogService.getAllBlogsFromDB(req.query);
    
    sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "Blogs are retrived successfully..",
            data: result,
        })

})


const updateBlog: RequestHandler = tryCatchAsync(async (req, res) => {  
    const blogId = req.params.blogId;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        throw new AppError(400,"Blog ID is not valid!"); 
    };


    const targetBlog = await BlogModel.findById(blogId).populate<{
        author: TUser;
    }>({
        path: 'author',
        select: 'email' 
    });

    if(!targetBlog){
        throw new AppError(400,"Blog doesn't exist!"); 
    }

    const authorizedAuthorEmail = targetBlog?.author?.email;
    const requestingUserEmail = req.user?.email;

    if(authorizedAuthorEmail !== requestingUserEmail){
        throw new AppError(HttpStatus.UNAUTHORIZED ,"You are not the author of the blog. Can not update!"); 
    }

    const updatedData = req.body;
    const updatedBlog = await BlogService.updateBlogIntoDB(blogId, updatedData);

    if (!updatedBlog) {
        throw new AppError(400,"Blog not updated!");
    }

    res.status(200).json({
        success: true,
        message: "Blog updated successfully!",
        data: updatedBlog
    });
});


const deleteBlog = tryCatchAsync( async (req, res) => { 

    const blogId = req.params.blogId;

    const targetBlog = await BlogModel.findById(blogId).populate<{
        author: TUser;
    }>({
        path: 'author',
        select: 'email' 
    });

    if(!targetBlog){
        throw new AppError(400,"Blog doesn't exist!"); 
    }

    const authorizedAuthorEmail = targetBlog?.author?.email;
    const requestingUserEmail = req.user?.email;

    if(authorizedAuthorEmail !== requestingUserEmail){
        throw new AppError(HttpStatus.UNAUTHORIZED ,"You are not the author of the blog. Can not delete!"); 
    }


    const result = await BlogService.deleteBlogFromDB(blogId);
    
    sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Blog is deleted successfully..",
            data: result,
        })

});


export const BlogController = {
    createBlog,
    updateBlog,
    getAllBlogs,
    deleteBlog
}