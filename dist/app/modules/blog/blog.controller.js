"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../../errors/error");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const tryCatchAsync_1 = require("../../utils/tryCatchAsync");
const blog_model_1 = require("./blog.model");
const blog_service_1 = require("./blog.service");
const http_status_1 = __importDefault(require("http-status"));
const createBlog = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.createBlogIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Blog is posted successfully.",
        data: result
    });
}));
const getAllBlogs = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogService.getAllBlogsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Blogs are retrived successfully..",
        data: result,
    });
}));
const updateBlog = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blogId = req.params.blogId;
    if (!mongoose_1.default.Types.ObjectId.isValid(blogId)) {
        throw new error_1.AppError(400, "Blog ID is not valid!");
    }
    ;
    const targetBlog = yield blog_model_1.BlogModel.findById(blogId).populate({
        path: 'author',
        select: 'email'
    });
    if (!targetBlog) {
        throw new error_1.AppError(400, "Blog doesn't exist!");
    }
    const authorizedAuthorEmail = (_a = targetBlog === null || targetBlog === void 0 ? void 0 : targetBlog.author) === null || _a === void 0 ? void 0 : _a.email;
    const requestingUserEmail = (_b = req.user) === null || _b === void 0 ? void 0 : _b.email;
    if (authorizedAuthorEmail !== requestingUserEmail) {
        throw new error_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not the author of the blog. Can not update!");
    }
    const updatedData = req.body;
    const updatedBlog = yield blog_service_1.BlogService.updateBlogIntoDB(blogId, updatedData);
    if (!updatedBlog) {
        throw new error_1.AppError(400, "Blog not updated!");
    }
    res.status(200).json({
        success: true,
        message: "Blog updated successfully!",
        data: updatedBlog
    });
}));
const deleteBlog = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const blogId = req.params.blogId;
    const targetBlog = yield blog_model_1.BlogModel.findById(blogId).populate({
        path: 'author',
        select: 'email'
    });
    if (!targetBlog) {
        throw new error_1.AppError(400, "Blog doesn't exist!");
    }
    const authorizedAuthorEmail = (_a = targetBlog === null || targetBlog === void 0 ? void 0 : targetBlog.author) === null || _a === void 0 ? void 0 : _a.email;
    const requestingUserEmail = (_b = req.user) === null || _b === void 0 ? void 0 : _b.email;
    if (authorizedAuthorEmail !== requestingUserEmail) {
        throw new error_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not the author of the blog. Can not delete!");
    }
    const result = yield blog_service_1.BlogService.deleteBlogFromDB(blogId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Blog is deleted successfully..",
        data: result,
    });
}));
exports.BlogController = {
    createBlog,
    updateBlog,
    getAllBlogs,
    deleteBlog
};
