"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("./modules/auth/auth.route");
const blog_routes_1 = require("./modules/blog/blog.routes");
const admin_route_1 = require("./modules/admin/admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/blogs',
        route: blog_routes_1.BlogRoutes
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
