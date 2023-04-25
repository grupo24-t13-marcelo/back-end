import { NotFoundError } from "../helpers/Errors.helper";
import { photoRepository, vehicleRepository } from "../repositories";
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

  async update(data: IcreatePhoto, photoId: string) {
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

  async delete(photoId: string) {
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
