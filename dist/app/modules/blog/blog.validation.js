"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidationSchema = exports.blogValidationSchema = void 0;
const zod_1 = require("zod");
exports.blogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            invalid_type_error: 'Blog title must be string'
        }).max(200, { message: 'Blog title can be a maximum of 200 characters long' }),
        content: zod_1.z.string({
            invalid_type_error: 'Blog content must be string'
        }),
        author: zod_1.z.string(),
    })
});
exports.updateBlogValidationSchema = zod_1.z.object({
    body: exports.blogValidationSchema.shape.body.partial(),
});
