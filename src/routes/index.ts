import { Router } from "express";
import { DataMiddleware } from "../middlewares/Data.middleware";
import { UserController } from "../controllers/User.controllers";
import { VehicleController } from "../controllers/Vehicle.controllers";
import { ProfileController } from "../controllers/Profile.controller";
import { LoginSchemas } from "../schemas/LoginSchemas";
import { LoginControllers } from "../controllers/Login.controllers";
import { CommentController } from "../controllers/Comment.controller";
import { AddressController } from "../controllers/Address.controller";
import { PhotoController } from "../controllers/Photo.controller";
import { UserSchemas } from "../schemas/UserSchemas";
import { VehicleSchemas } from "../schemas/Vehicles.Schemas";
import { CommentSchemas } from "../schemas/CommentSchemas";
import { PhotoSchemas } from "../schemas/PhotoSchemas";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { VehicleMiddleware } from "../middlewares/Vihecle.middleware";
import { CommentMiddleware } from "../middlewares/Comment.middleware";
import { UuidMiddleware } from "../middlewares/Uuid.middleware";

const vehicleMiddleware = new VehicleMiddleware();
const dataMiddleware = new DataMiddleware();
const userController = new UserController();
const profileController = new ProfileController();
const vehicleController = new VehicleController();
const loginController = new LoginControllers();
const commentController = new CommentController();
const addressController = new AddressController();
const photoController = new PhotoController();
const authMiddleware = new AuthMiddleware();
const commentMiddleware = new CommentMiddleware();
const uuidMiddleware = new UuidMiddleware();

export const routes = Router();

routes.get("/users", authMiddleware.verify, userController.get);

routes.get(
  "/users/:id",
  uuidMiddleware.ensureValidUuid,
  userController.getUserById
);

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

routes.patch("/rest-password", userController.sendResetEmailPassword);

routes.patch(
  "/rest-password/new-password/:userToken",
  userController.updateNewPassword
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

routes.get("/vehicles", vehicleController.get);

routes.get(
  "/vehicles/:id",
  uuidMiddleware.ensureValidUuid,
  vehicleController.getById
);

routes.delete(
  "/vehicles/:id",
  authMiddleware.verify,
  authMiddleware.isAdvertiser,
  vehicleMiddleware.ensureIsOwner,
  uuidMiddleware.ensureValidUuid,
  vehicleController.delete
);

routes.patch(
  "/vehicles/:id",
  authMiddleware.verify,
  authMiddleware.isAdvertiser,
  vehicleMiddleware.ensureIsOwner,
  uuidMiddleware.ensureValidUuid,
  dataMiddleware.ensureData(VehicleSchemas.updateVehicleRequestSchemas),
  vehicleController.update
);

routes.get("/profile", authMiddleware.verify, profileController.get);

routes.post(
  "/comments/:id",
  authMiddleware.verify,
  uuidMiddleware.ensureValidUuid,
  dataMiddleware.ensureData(CommentSchemas.createCommentSchemaRequest),
  commentController.create
);

routes.get(
  "/comments/:id",
  authMiddleware.verify,
  uuidMiddleware.ensureValidUuid,
  commentController.get
);

routes.patch(
  "/comments/:id",
  authMiddleware.verify,
  uuidMiddleware.ensureValidUuid,
  commentMiddleware.ensureIsCommentOwner,
  dataMiddleware.ensureData(CommentSchemas.createCommentSchemaRequest),
  commentController.update
);

routes.delete(
  "/comments/:id",
  authMiddleware.verify,
  uuidMiddleware.ensureValidUuid,
  commentMiddleware.ensureIsCommentOwner,
  commentController.delete
);

routes.post(
  "/photos/:id",
  authMiddleware.verify,
  authMiddleware.isAdvertiser,
  uuidMiddleware.ensureValidUuid,
  dataMiddleware.ensureData(PhotoSchemas.createPhotoSchemaRequest),
  photoController.create
);

routes.patch(
  "/photos/:id",
  authMiddleware.verify,
  authMiddleware.isAdvertiser,
  uuidMiddleware.ensureValidUuid,
  dataMiddleware.ensureData(PhotoSchemas.createPhotoSchemaRequest),
  photoController.update
);

routes.delete(
  "/photos/:id",
  authMiddleware.verify,
  authMiddleware.isAdvertiser,
  uuidMiddleware.ensureValidUuid,
  photoController.delete
);

routes.patch("/address", authMiddleware.verify, addressController.update);
