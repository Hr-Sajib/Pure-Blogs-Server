import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { TUserRole, USER_ROLE } from "../auth/role.constants";
import { BlogController } from "./blog.controller";
import { blogValidationSchema, updateBlogValidationSchema } from "./blog.validation";


const router = express.Router();

router.post(
  "/", 
  auth(USER_ROLE.user as TUserRole),
  validateRequest(blogValidationSchema),
  BlogController.createBlog
);

router.patch(
    "/:blogId",
    auth(USER_ROLE.user as TUserRole),
    validateRequest(updateBlogValidationSchema),
    BlogController.updateBlog
);

router.get(
    "/",
    BlogController.getAllBlogs
)

router.delete(
    "/:blogId",
    auth(USER_ROLE.user as TUserRole),
    BlogController.deleteBlog
)




export const BlogRoutes = router;
