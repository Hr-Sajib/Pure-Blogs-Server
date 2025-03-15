import express from "express";
import { BlogController } from "../blog/blog.controller";
import { UserController } from "../user/user.controller";


const router = express.Router();

router.patch(
    "/users/:userId/block",
    UserController.blockUser
);

router.delete(
    "/blogs/:blogId",
    BlogController.deleteBlog
)





export const AdminRoutes = router;
