"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const role_constants_1 = require("../auth/role.constants");
const blog_controller_1 = require("../blog/blog.controller");
const user_controller_1 = require("../user/user.controller");
const router = express_1.default.Router();
router.patch("/users/:userId/block", (0, auth_1.auth)(role_constants_1.USER_ROLE.admin), user_controller_1.UserController.blockUser);
router.delete("/blogs/:blogId", (0, auth_1.auth)(role_constants_1.USER_ROLE.admin), blog_controller_1.BlogController.deleteBlog);
exports.AdminRoutes = router;
