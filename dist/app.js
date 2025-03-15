"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const app = (0, express_1.default)();
// const port = 3000
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", routes_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to Pure Blogs server..");
});
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
