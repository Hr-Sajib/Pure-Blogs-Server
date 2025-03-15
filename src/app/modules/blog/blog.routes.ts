import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { BlogController } from "./blog.controller";
import { blogValidationSchema, updateBlogValidationSchema } from "./blog.validation";


const router = express.Router();

router.post(
  "/", 
  auth(),
  validateRequest(blogValidationSchema),
  BlogController.createBlog
);

router.patch(
    "/:blogId",
    auth(),
    validateRequest(updateBlogValidationSchema),
    BlogController.updateBlog
);

router.get(
    "/",
    BlogController.getAllBlogs
)

router.delete(
    "/:blogId",
    auth(),
    BlogController.deleteBlog
)




export const BlogRoutes = router;
