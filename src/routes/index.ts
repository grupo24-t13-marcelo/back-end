import { Router } from "express";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { UserController } from "../controllers/User.controllers";
import { LoginSchemas } from "../schemas/LoginSchemas";
import { LoginControllers } from "../controllers/Login.controllers";
import { UserSchemas } from "../schemas/UserSchemas";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const dataMiddleware = new DataMiddleware();
const userController = new UserController();
const loginController = new LoginControllers();
const authMiddleware = new AuthMiddleware();

export const routes = Router();

routes.post(
  "/users",
  dataMiddleware.ensureData(UserSchemas.createUserRequestSchema),
  userController.create
);

routes.delete("/users", authMiddleware.verify, userController.delete);

routes.post(
  "/login",
  dataMiddleware.ensureData(LoginSchemas.loginRequestSchema),
  loginController.login
);
