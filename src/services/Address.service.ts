import { IUserAddressRequest } from "../interfaces/user.interfaces";
import { addressRepository } from "../repositories";
import { AddressSchemas } from "../schemas/AddressSchemas";

export class AddressService {
  async update(updateData: IUserAddressRequest, userId: string) {
    const userQueryBuilder = addressRepository.createQueryBuilder("a");
    const address = await userQueryBuilder
      .where("a.ownerid = :userId", {
        userId,
      })
      .getOne();

    let addressUpdated = addressRepository.create({
      ...address,
      ...updateData,
    });

    addressUpdated = await addressRepository.save(addressUpdated);

    return await AddressSchemas.updateAddressResponseSchema.validate(
      addressUpdated,
      {
        stripUnknown: true,
      }
    );
  }
}
