import AppDataSource from "./data-source";
import User from "./entities/User.entity";
import Vehicle from "./entities/Vehicles.entity";

export const userRepository = AppDataSource.getRepository(User);
export const vehicleRepository = AppDataSource.getRepository(Vehicle);
