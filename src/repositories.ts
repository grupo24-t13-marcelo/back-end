import AppDataSource from "./data-source";
import Address from "./entities/Address.entity";
import User from "./entities/User.entity";
import Vehicle from "./entities/Vehicles.entity";

export const userRepository = AppDataSource.getRepository(User);
export const vehicleRepository = AppDataSource.getRepository(Vehicle);
export const addressRepository = AppDataSource.getRepository(Address);
