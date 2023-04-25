import AppDataSource from "./data-source";
import Address from "./entities/Address.entity";
import Photo from "./entities/Photos.entity";
import User from "./entities/User.entity";
import Vehicle from "./entities/Vehicles.entity";
import Comment from "./entities/Comments.entity";

export const userRepository = AppDataSource.getRepository(User);
export const vehicleRepository = AppDataSource.getRepository(Vehicle);
export const addressRepository = AppDataSource.getRepository(Address);
export const photoRepository = AppDataSource.getRepository(Photo);
export const commentsRepository = AppDataSource.getRepository(Comment);
