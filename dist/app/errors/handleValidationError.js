"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorSources = Object.entries(err.errors).map(([key, val]) => ({
        path: key, // Extracting key as the path
        message: val.message // Extracting message from validation error
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handleValidationError = handleValidationError;
