import express from "express";
import { AuthRoutes } from "./modules/auth/auth.route";
import { BlogRoutes } from "./modules/blog/blog.routes";
import { AdminRoutes } from "./modules/admin/admin.route";

const router = express.Router();

const moduleRoutes = [
    {
        path:'/auth',
        route: AuthRoutes
    },
    {
        path:'/blogs',
        route: BlogRoutes
    },
    {
        path:'/admin',
        route: AdminRoutes
    },
    
]

moduleRoutes.forEach(route => router.use(route.path,route.route))

export default router;

