import { Router } from "express";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { UserController } from "../controllers/User.controllers";
import { LoginSchemas } from "../schemas/LoginSchemas";
import { LoginControllers } from "../controllers/Login.controllers";
import { UserSchemas } from "../schemas/UserSchemas";

const dataMiddleware = new DataMiddleware();
const userController = new UserController();
const loginController = new LoginControllers();

export const routes = Router();

routes.use(
  "/users",
  dataMiddleware.ensureData(UserSchemas.createUserRequestSchema),
  userController.create
);
routes.use(
  "/login",
  dataMiddleware.ensureData(LoginSchemas.loginRequestSchema),
  loginController.login
);
