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

)




export const BlogRoutes = router;
