"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const error_1 = require("../errors/error");
const handleCastError_1 = require("../errors/handleCastError");
const handleDuplicateError_1 = require("../errors/handleDuplicateError");
const handleValidationError_1 = require("../errors/handleValidationError");
const handleZodError_1 = require("../errors/handleZodError");
const globalErrorHandler = (err, req, res) => {
    // default values 
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.name == 'CastError') {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.code == 11000) {
        const simplifiedError = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if (err instanceof error_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err.message
            }
        ];
    }
    else if (err instanceof Error) {
        ;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorSources = [
            {
                path: '',
                message: err.message
            }
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};
exports.globalErrorHandler = globalErrorHandler;
