import { RequestHandler } from "express";
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

export const BlogController = {
    createBlog,
}