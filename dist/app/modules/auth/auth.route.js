"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_controller_1 = require("../user/user.controller");
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.userValidationSchema), user_controller_1.UserController.createUser);
router.post("/login", (0, validateRequest_1.validateRequest)(auth_validation_1.logInUserValidationSchema), auth_controller_1.AuthController.logInUser);
exports.AuthRoutes = router;
