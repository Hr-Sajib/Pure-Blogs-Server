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
exports.AuthServices = void 0;
const error_1 = require("../../errors/error");
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const logInUserWithCreds = (loginCreds) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('login req from :', loginCreds)
    var _a;
    const isUserExists = yield user_model_1.UserModel.isUserExists(loginCreds === null || loginCreds === void 0 ? void 0 : loginCreds.email);
    const passwordMatched = yield user_model_1.UserModel.isPasswordMatched(loginCreds === null || loginCreds === void 0 ? void 0 : loginCreds.email, loginCreds === null || loginCreds === void 0 ? void 0 : loginCreds.password);
    // console.log("pass:",passwordMatched)
    if (!isUserExists) {
        throw new error_1.AppError(401, "User doesn't exist!");
    }
    if (isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.isBlocked) {
        throw new error_1.AppError(401, "User is blocked. Can't login!");
    }
    if (!passwordMatched) {
        throw new error_1.AppError(401, "Invalid credentials!");
    }
    // ✅ Generate access token after successful login
    const accessToken = jsonwebtoken_1.default.sign({
        email: loginCreds === null || loginCreds === void 0 ? void 0 : loginCreds.email,
        role: (_a = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.user) === null || _a === void 0 ? void 0 : _a.role,
    }, config_1.default.jwt_access_secret, { expiresIn: "1d" });
    return ({
        token: accessToken
    });
});
exports.AuthServices = {
    logInUserWithCreds
};
