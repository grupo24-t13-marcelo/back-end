import { ConflictError } from "../helpers/Errors.helper";
import { ICreateUserRequest } from "../interfaces/user.interfaces";
import { userRepository } from "../repositories";
import { UserSchemas } from "../schemas/UserSchemas";

export class UserServices {
  async create(dataUser: ICreateUserRequest) {
    const findUser = await userRepository.findOne({
      where: [
        { cpf: dataUser.cpf },
        { email: dataUser.name },
        { number: dataUser.number },
      ],
    });

    if (findUser) {
      if (findUser.email == dataUser.email) {
        throw new ConflictError("Email already registered");
      }

      if (findUser.cpf == dataUser.cpf) {
        throw new ConflictError("Cpf already registed");
      }

      if (findUser.number == dataUser.number) {
        throw new ConflictError("Number already registered");
      }
    }

    let newUser = userRepository.create(dataUser);
    newUser = await userRepository.save(newUser);

    return await UserSchemas.createUserResponseSchema.validate(newUser, {
      stripUnknown: true,
    });
  }
}
