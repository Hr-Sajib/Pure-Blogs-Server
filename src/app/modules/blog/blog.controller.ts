import { RequestHandler } from "express";
import mongoose from "mongoose";
import { AppError } from "../../errors/error";
import sendResponse from "../../utils/sendResponse";
import { tryCatchAsync } from "../../utils/tryCatchAsync";
import { BlogService } from "./blog.service";


const createBlog: RequestHandler = tryCatchAsync(async (req, res, next) => {
    const result = await BlogService.createBlogIntoDB(req.body);

    sendResponse(res, { 
        success: true,
        statusCode: 201,
        message: "Blog is posted successfully.",
        data: result
    });
});

const getAllBlogs = tryCatchAsync( async(req, res, next)=>{ 
        
    const result = await BlogService.getAllBlogsFromDB(req.query);
    
    sendResponse(res, {
            success: true,
            statusCode: 201,
            message: "Blogs are retrived successfully..",
            data: result,
        })

})


const updateBlog: RequestHandler = tryCatchAsync(async (req, res, next) => {  
    const blogId = req.params.blogId;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        throw new AppError(400,"Blog ID is not valid!"); 
    };

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


const deleteBlog = tryCatchAsync( async (req, res, next) => { 

    const blogId = req.params.blogId;
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