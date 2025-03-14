import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { BlogController } from "./blog.controller";
import { blogValidationSchema } from "./blog.validation";


const router = express.Router();

router.post(
  "/",
  validateRequest(blogValidationSchema),
  BlogController.createBlog
);




export const BlogRoutes = router;
