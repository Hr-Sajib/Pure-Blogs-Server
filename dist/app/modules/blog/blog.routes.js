"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const role_constants_1 = require("../auth/role.constants");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(role_constants_1.USER_ROLE.user), (0, validateRequest_1.validateRequest)(blog_validation_1.blogValidationSchema), blog_controller_1.BlogController.createBlog);
router.patch("/:blogId", (0, auth_1.auth)(role_constants_1.USER_ROLE.user), (0, validateRequest_1.validateRequest)(blog_validation_1.updateBlogValidationSchema), blog_controller_1.BlogController.updateBlog);
router.get("/", blog_controller_1.BlogController.getAllBlogs);
router.delete("/:blogId", (0, auth_1.auth)(role_constants_1.USER_ROLE.user), blog_controller_1.BlogController.deleteBlog);
exports.BlogRoutes = router;
