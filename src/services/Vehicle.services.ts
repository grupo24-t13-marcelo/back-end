import { vehicleRepository } from "../repositories";
import { userRepository } from "../repositories";
import { photoRepository } from "../repositories";
import { VehicleSchemas } from "../schemas/Vehicles.Schemas";
import {
  ICreateVehicleRequest,
  IUpdateVehicleRequest,
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

    const photos = data.photos;

    if (photos.photourl.length > 0) {
      for (let i = 0; i < photos.photourl.length; i++) {
        const newPhoto = photoRepository.create({
          photourl: photos.photourl[i],
          vehicle: dataReturned,
        });
        await photoRepository.save(newPhoto);
      }
    }

    const vehicleReturned = { ...dataReturned, photos: [...photos.photourl] };

    return await VehicleSchemas.createVehicleResponseSchema.validate(
      vehicleReturned,
      {
        stripUnknown: true,
      }
    );
  }

  async get() {
    const vehicle = await vehicleRepository.find({
      relations: { user: true },
    });

    return VehicleSchemas.getAllVehicleSchemas.validate(vehicle, {
      stripUnknown: true,
    });
  }

  async getVehicleById(vehicleId: string) {
    const vehicle = await vehicleRepository.find({
      where: { id: vehicleId },
      relations: { comments: true, photos: true },
    });
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
