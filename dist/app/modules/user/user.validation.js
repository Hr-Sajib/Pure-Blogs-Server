"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: 'Name must be a string'
        }).max(50, { message: 'Name can be a maximum of 50 characters long' }),
        email: zod_1.z.string({
            invalid_type_error: 'Email must be a string'
        }).email({ message: 'Invalid email format' }),
        password: zod_1.z.string({
            invalid_type_error: 'Password must be a string'
        })
            .min(8, { message: 'Password must be at least 8 characters long' }),
    })
});
