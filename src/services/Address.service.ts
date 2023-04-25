import { NotFoundError } from "../helpers/Errors.helper";
import { addressRepository } from "../repositories";
import { userRepository } from "../repositories";
import { IUserAddressUpdateRequest } from "../interfaces/user.interfaces";

export class AddressService {
  async update(data: IUserAddressUpdateRequest, userId: string) {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: { address: true },
    });

    if (!user) {
      throw new NotFoundError("Comment not found");
    }

    const addressid = user.address.id;

    const address = await addressRepository.findOne({
      where: { id: addressid },
    });

    const updateAddress = addressRepository.create({ ...address, ...data });
    const updateAddressReturn = await addressRepository.save(updateAddress);

    return updateAddressReturn;
  }
}
