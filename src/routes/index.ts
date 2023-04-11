import { Router } from "express";

// import { UserController } from "../controllers/User.controller";
import { DataMiddleware } from "../middlewares/Data.middleware";
// import { LoginSchema } from "../schemas/Login.schema";
// import { profileRoutes } from "./profile.routes";
// import { userRoutes } from "./user.routes";

//const dataMiddleware = new DataMiddleware();

export const routes = Router();

routes.use("/users");
// routes.use(
//   "/login",
//   dataMiddleware.ensureData(loginSchema.login),
//   new UserController().login
// );
//routes.use("/profile", profileRoutes);
