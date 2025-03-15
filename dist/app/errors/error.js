"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const mongoose_1 = require("mongoose");
class AppError extends mongoose_1.Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            mongoose_1.Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.AppError = AppError;
