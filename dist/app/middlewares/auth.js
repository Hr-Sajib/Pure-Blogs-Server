"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const tryCatchAsync_1 = require("../utils/tryCatchAsync");
const config_1 = __importDefault(require("../config"));
const error_1 = require("../errors/error");
const auth = (...roles) => {
    return (0, tryCatchAsync_1.tryCatchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Get the Authorization header
        const token = req.headers.authorization;
        // console.log("token: ",token)
        // Validate the presence and format of the token
        if (!token) {
            throw new error_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        // Verify the token and handle potential errors
        jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret, (err, decoded) => {
            if (err) {
                throw new error_1.AppError(http_status_1.default.UNAUTHORIZED, "Invalid or expired token!");
            }
            const decodedUserRole = decoded.role;
            if (roles && !roles.includes(decodedUserRole)) {
                throw new error_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
            }
            // Attach decoded user information to the request object
            req.user = decoded;
            next();
        });
    }));
};
exports.auth = auth;
