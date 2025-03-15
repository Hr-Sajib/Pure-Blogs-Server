import express from "express";
import { auth } from "../../middlewares/auth";
import { BlogController } from "../blog/blog.controller";
import { UserController } from "../user/user.controller";


const router = express.Router();

router.patch(
    "/users/:userId/block",
    auth(),
    UserController.blockUser
);

router.delete(
    "/blogs/:blogId",
    auth(),
    BlogController.deleteBlog
)





export const AdminRoutes = router;
