import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserController } from "./auth.controller";
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
  UserController.logInUser
);




export const AuthRoutes = router;
