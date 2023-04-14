import { hash } from "bcrypt";
import { ConflictError } from "../helpers/Errors.helper";
import {
  ICreateUserRequest,
  IUpdateUserRequest,
} from "../interfaces/user.interfaces";
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

  async delete(userId: string) {
    await userRepository.delete({ id: userId });
    return;
  }

  async update(updateData: IUpdateUserRequest, userId: string) {
    if (updateData.cpf || updateData.email || updateData.number) {
      const { cpf, email, number } = updateData;

      const userQueryBuilder = userRepository.createQueryBuilder("u");
      const findUserConflict = await userQueryBuilder
        .where(
          "(u.cpf = :cpf OR u.email = :email OR u.number = :number) AND u.id <> :userId",
          {
            cpf,
            email,
            number,
            userId,
          }
        )
        .getOne();

      if (findUserConflict) {
        if (findUserConflict?.cpf == cpf) {
          throw new ConflictError("Cpf already registered");
        } else if (findUserConflict?.email == email) {
          throw new ConflictError("Email already registered");
        } else if (findUserConflict?.number == number) {
          throw new ConflictError("Number already registered");
        }
      }
    }

    if (updateData.password) {
      updateData.password = await hash(updateData.password, 10);
    }

    const user = await userRepository.findOneBy({ id: userId });
    let userUpdated = userRepository.create({ ...user, ...updateData });
    userUpdated = await userRepository.save(userUpdated);

    return await UserSchemas.updateUserResponseSchema.validate(userUpdated, {
      stripUnknown: true,
    });
  }

  async get() {
    const users = await userRepository.find();
    return users;
  }
}
