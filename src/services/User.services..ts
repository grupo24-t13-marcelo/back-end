import { hash } from "bcrypt";

import { randomUUID } from "crypto";

import { ConflictError, NotFoundError } from "../helpers/Errors.helper";
import {
  ICreateUserRequest,
  IUpdateNewPasswordRequest,
  IUpdateUserRequest,
} from "../interfaces/user.interfaces";
import { addressRepository, userRepository } from "../repositories";
import { UserSchemas } from "../schemas/UserSchemas";

import { EmailService } from "../../utils/sendEmail.utils";

const emailService = new EmailService();

import { NotBeforeError } from "jsonwebtoken";


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

    let newAddress = addressRepository.create(dataUser.address);
    newAddress = await addressRepository.save({
      ...newAddress,
      ownerid: newUser,
    });

    newUser.address = newAddress;
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
    const users = await userRepository.find({
      relations: { address: true },
    });
    return await UserSchemas.getUsersResponseSchema.validate(users, {
      stripUnknown: true,
    });
  }


  async sendResetEmailPassword(email: string) {
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const token = randomUUID();

    await userRepository.update({ email: email }, { userToken: token });

    const restPasswordTemplate = emailService.restPasswordTemplate(
      email,
      user.name,
      token
    );

    await emailService.sendEmail(restPasswordTemplate);
  }

  async updateNewPassword(
    dataPassword: IUpdateNewPasswordRequest,
    userToken: string
  ) {
    const user = await userRepository.findOneBy({ userToken });

  async getById(id: string) {
    const user = await userRepository.findOne({
      where: { id: id },
      relations: { address: true, vehicles: true },
    });


    if (!user) {
      throw new NotFoundError("User not found");
    }


    const hashPassword = await hash(dataPassword.password, 10);
    await userRepository.update(
      { userToken },
      { password: hashPassword, userToken: null }
    );

    return await UserSchemas.getUserIdSchema.validate(user, {
      stripUnknown: true,
    });

  }
}
