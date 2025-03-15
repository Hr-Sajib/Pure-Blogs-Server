import express from "express";
import { auth } from "../../middlewares/auth";
import { TUserRole, USER_ROLE } from "../auth/role.constants";
import { BlogController } from "../blog/blog.controller";
import { UserController } from "../user/user.controller";



const router = express.Router();

router.patch(
    "/users/:userId/block",
    auth(USER_ROLE.admin as TUserRole),
    UserController.blockUser
);

router.delete(
    "/blogs/:blogId",
    auth(USER_ROLE.admin as TUserRole),
    BlogController.deleteBlog
)





export const AdminRoutes = router;
