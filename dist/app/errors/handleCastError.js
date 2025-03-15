"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handleCastError = handleCastError;
