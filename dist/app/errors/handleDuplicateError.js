"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    let extractedValue = '';
    const errorMessage = err === null || err === void 0 ? void 0 : err.message;
    const match = errorMessage.match(/\{([^}]+)\}/);
    if (match) {
        extractedValue = match[1].split(": ")[1].replace(/"/g, "");
    }
    const errorSources = [
        {
            path: '',
            message: `Already exists: ${extractedValue}`,
        },
    ];
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources,
    };
};
exports.handleDuplicateError = handleDuplicateError;
