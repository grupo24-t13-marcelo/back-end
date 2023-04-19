import { Router } from "express";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { UserController } from "../controllers/User.controllers";
import { VehicleController } from "../controllers/Vehicle.controllers";
import { ProfileController } from "../controllers/Profile.controller";
import { LoginSchemas } from "../schemas/LoginSchemas";
import { LoginControllers } from "../controllers/Login.controllers";
import { UserSchemas } from "../schemas/UserSchemas";
import { VehicleSchemas } from "../schemas/Vehicles.Schemas";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const dataMiddleware = new DataMiddleware();
const userController = new UserController();
const profileController = new ProfileController();
const vehicleController = new VehicleController();
const loginController = new LoginControllers();
const authMiddleware = new AuthMiddleware();

export const routes = Router();

routes.get("/users", authMiddleware.verify, userController.get);

routes.post(
  "/users",
  dataMiddleware.ensureData(UserSchemas.createUserRequestSchema),
  userController.create
);

routes.delete("/users", authMiddleware.verify, userController.delete);

routes.patch(
  "/users",
  authMiddleware.verify,
  dataMiddleware.ensureData(UserSchemas.updateUserRequestSchema),
  userController.update
);

routes.post(
  "/login",
  dataMiddleware.ensureData(LoginSchemas.loginRequestSchema),
  loginController.login
);

routes.post(
  "/vehicles",
  authMiddleware.verify,
  authMiddleware.isAdvertiser,
  dataMiddleware.ensureData(VehicleSchemas.createVehicleRequestSchemas),
  vehicleController.create
);

routes.get("/vehicles", authMiddleware.verify, vehicleController.get);

routes.delete(
  "/vehicles/:id",
  authMiddleware.verify,
  authMiddleware.isAdvertiser,
  vehicleController.delete
);

routes.patch(
  "/vehicles/:id",
  authMiddleware.verify,
  authMiddleware.isAdvertiser,
  dataMiddleware.ensureData(VehicleSchemas.updateVehicleRequestSchemas),
  vehicleController.update
);

routes.get("/profile", authMiddleware.verify, profileController.get);

routes.post("/comments", authMiddleware.verify);

routes.get("/comments/:id", authMiddleware.verify);

routes.patch("/comments/:id", authMiddleware.verify);

routes.delete("/comments/:id", authMiddleware.verify);

routes.post("/photos/:id", authMiddleware.verify, authMiddleware.verify);

routes.patch("/photos/:id", authMiddleware.verify, authMiddleware.isAdvertiser);

routes.delete(
  "/photos/:id",
  authMiddleware.verify,
  authMiddleware.isAdvertiser
);
