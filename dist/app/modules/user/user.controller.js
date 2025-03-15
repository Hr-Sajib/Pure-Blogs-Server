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
exports.UserController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../../errors/error");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const tryCatchAsync_1 = require("../../utils/tryCatchAsync");
const user_service_1 = require("./user.service");
const createUser = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.createUserIntoDB(req.body);
    if (!result) {
        throw new error_1.AppError(400, "User not registerd. Error occured!");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "User registered successfully.",
        data: result
    });
}));
const blockUser = (0, tryCatchAsync_1.tryCatchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new error_1.AppError(400, "User ID is not valid!");
    }
    ;
    const blockedUser = yield user_service_1.UserServices.blockUserIntoDB(userId);
    if (!blockedUser) {
        throw new error_1.AppError(400, "User not blocked. Error occured!");
    }
    res.status(200).json({
        success: true,
        message: "User blocked successfully!",
        data: blockedUser
    });
}));
exports.UserController = {
    createUser,
    blockUser
};
