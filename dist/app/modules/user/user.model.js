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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../../errors/error");
// Create the user schema
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });
// Password hashing middleware
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        const salt = yield bcrypt_1.default.genSalt(10);
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        next();
    });
});
// Static methods
// Check if user exists and return block status
userSchema.statics.isUserExists = function (userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email: userEmail });
        if (!user) {
            throw new error_1.AppError(401, "User does not exist!");
        }
        return { user, isBlocked: user.isBlocked };
    });
};
// Check if the provided password matches the stored password
userSchema.statics.isPasswordMatched = function (userEmail, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email: userEmail }).select("email password");
        if (!user)
            return false;
        const matched = yield bcrypt_1.default.compare(password, user.password);
        return matched;
    });
};
// ✅ Create the UserModel and cast it to the UserModel interface
exports.UserModel = (0, mongoose_1.model)("Users", userSchema);
