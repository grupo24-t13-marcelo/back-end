import { vehicleRepository } from "../repositories";
import { userRepository } from "../repositories";
import {
  ICreateVehicleRequest,
  ICreateVehicleResponse,
  IUpdateVehicleRequest,
  IUpdateVehicleResponse,
} from "../interfaces/vehicle.inetfaces";
import { NotFoundError } from "../helpers/Errors.helper";

export class VehicleServices {
  async create(data: ICreateVehicleRequest, userId: string) {
    const findUser = await userRepository.findOne({
      where: { id: userId },
    });

    const newVehicle = vehicleRepository.create({
      title: data.title,
      brand: data.brand,
      model: data.model,
      year: data.year,
      fuel: data.fuel,
      mileage: data.mileage,
      price: data.price,
      description: data.description,
      coverUrl: data.coverUrl,
      bellowFipe: data.bellowFipe,
      fipe: data.fipe,
      user: { ...findUser },
    });
    const dataReturned = await vehicleRepository.save(newVehicle);

    return dataReturned;
  }

  async get() {
    const vehicle = await vehicleRepository.find();
    return vehicle;
  }

  async delete(vehicleId: string) {
    const vehicle = await vehicleRepository.findOne({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    await vehicleRepository.delete({ id: vehicleId });
    return;
  }

  async update(data: IUpdateVehicleRequest, userId: string, vehicleId: string) {
    const vehicle = await vehicleRepository.findOne({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    let vehicleUpdate = vehicleRepository.create({ ...vehicle, ...data });
    vehicleUpdate = await vehicleRepository.save(vehicleUpdate);

    return vehicleUpdate;
  }
}
