import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "../user/user.controller";
import { AuthController } from "./auth.controller";
import { logInUserValidationSchema, userValidationSchema } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchema),
  UserController.createUser
);

router.post(
  "/login",
  validateRequest(logInUserValidationSchema),
  AuthController.logInUser
);




export const AuthRoutes = router;
