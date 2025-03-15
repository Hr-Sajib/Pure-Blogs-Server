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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const error_1 = require("../../errors/error");
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(userData);
    return result;
});
const blockUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield user_model_1.UserModel.findById(userId);
    if (!userExists) {
        throw new error_1.AppError(400, "User doesnt exist!");
    }
    return user_model_1.UserModel.findByIdAndUpdate(userId, { $set: { isBlocked: true } }, { new: true });
});
exports.UserServices = {
    createUserIntoDB,
    blockUserIntoDB
};
