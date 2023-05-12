import { userRepository } from "../repositories";

export class ProfileService {
  async get(userId: string) {
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: { vehicles: true },
    });

    return user;
  }
}
