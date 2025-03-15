"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInUserValidationSchema = void 0;
const zod_1 = require("zod");
exports.logInUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            invalid_type_error: 'Email must be a string'
        }).email({ message: 'Invalid email format' }),
        password: zod_1.z.string({
            invalid_type_error: 'Password must be a string'
        }).min(8, { message: 'Password must be at least 8 characters long' }),
    })
});
