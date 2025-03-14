import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { BlogController } from "./blog.controller";
import { blogValidationSchema, updateBlogValidationSchema } from "./blog.validation";


const router = express.Router();

router.post(
  "/",
  validateRequest(blogValidationSchema),
  BlogController.createBlog
);

router.patch(
    "/:blogId",
    validateRequest(updateBlogValidationSchema),
    BlogController.updateBlog
);

router.get(
    "/",
    BlogController.getAllBlogs
)

router.delete(
    "/:blogId",
    BlogController.deleteBlog
)




export const BlogRoutes = router;
