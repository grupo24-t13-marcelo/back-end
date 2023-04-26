import { NotFoundError, UnauthorizedError } from "../helpers/Errors.helper";
import {
  photoRepository,
  vehicleRepository,
  userRepository,
} from "../repositories";
import { IcreatePhoto } from "../interfaces/vehicle.inetfaces";
import { PhotoSchemas } from "../schemas/PhotoSchemas";

export class PhotoService {
  async create(data: IcreatePhoto, vehicleId: string) {
    const vehicle = await vehicleRepository.findOne({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    const newPhoto = photoRepository.create({
      photourl: data.photourl,
      vehicle: { ...vehicle },
    });

    const newPhotoReturn = await photoRepository.save(newPhoto);

    return await PhotoSchemas.createPhotoSchemaResponse.validate(
      newPhotoReturn,
      {
        stripUnknown: true,
      }
    );
  }

  async update(data: IcreatePhoto, photoId: string, userId: string) {
    let status = false;

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: { vehicles: { photos: true } },
    });

    user?.vehicles.forEach((elem) => {
      elem.photos.forEach((elem) => {
        if (elem.id === photoId) {
          status = true;
        }
      });
    });

    if (status === false) {
      throw new UnauthorizedError("You Only Can Update Your Photos");
    }

    const findPhoto = await photoRepository.findOne({
      where: { id: photoId },
    });

    if (!findPhoto) {
      throw new NotFoundError("Photo not found");
    }

    const photoUpdate = photoRepository.create({ ...findPhoto, ...data });
    const photoUpdateReturn = await photoRepository.save(photoUpdate);

    return photoUpdateReturn;
  }

  async delete(photoId: string, userId: string) {
    let status = false;

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: { vehicles: { photos: true } },
    });

    user?.vehicles.forEach((elem) => {
      elem.photos.forEach((elem) => {
        if (elem.id === photoId) {
          status = true;
        }
      });
    });

    if (status === false) {
      throw new UnauthorizedError("You Only Can Delete Your Photos");
    }

    const findPhoto = photoRepository.findOne({
      where: { id: photoId },
    });

    if (!findPhoto) {
      throw new NotFoundError("Photo not found");
    }

    await photoRepository.delete({ id: photoId });
    return;
  }
}
