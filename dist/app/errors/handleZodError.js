"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue.message
        };
    });
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources
    };
};
exports.handleZodError = handleZodError;
