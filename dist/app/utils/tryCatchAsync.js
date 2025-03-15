"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchAsync = void 0;
const tryCatchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    };
};
exports.tryCatchAsync = tryCatchAsync;
