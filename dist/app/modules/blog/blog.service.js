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
exports.BlogService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const error_1 = require("../../errors/error");
const user_model_1 = require("../user/user.model");
const blog_constants_1 = require("./blog.constants");
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (blogData) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_model_1.UserModel.findById(blogData.author);
    if (!userExists) {
        throw new error_1.AppError(400, "Author does not exist.");
    }
    const result = yield blog_model_1.BlogModel.create(blogData);
    return result;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.BlogModel.find().populate('author'), query)
        .search(blog_constants_1.blogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield blogQuery.modelQuery;
    return result;
});
const updateBlogIntoDB = (blogId, updatedBlogData) => __awaiter(void 0, void 0, void 0, function* () {
    return blog_model_1.BlogModel.findByIdAndUpdate(blogId, { $set: updatedBlogData }, { new: true });
});
const deleteBlogFromDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blog_model_1.BlogModel.findById(blogId);
    if (!foundBlog) {
        throw new error_1.AppError(400, "Blog not found!");
    }
    const result = yield blog_model_1.BlogModel.findOneAndDelete({ _id: blogId });
    return result;
});
exports.BlogService = {
    createBlogIntoDB,
    updateBlogIntoDB,
    getAllBlogsFromDB,
    deleteBlogFromDB
};
