import * as yup from "yup";
import {
  ICreateUserRequest,
  ICreateUserResponse,
  IUpdateUserRequest,
  IUpdateUserResponse,
  IGetUserIdResponse,
} from "../interfaces/user.interfaces";
import { regexOnlyNumber, regexRemoveSpecialCharacters } from "./utils/regexs";

export class UserSchemas {
  static createUserRequestSchema: yup.SchemaOf<ICreateUserRequest> = yup
    .object()
    .shape({
      name: yup.string().min(3).max(26).trim().required(),
      email: yup.string().email().min(6).max(72).trim().required(),
      cpf: yup
        .string()
        .length(11)
        .trim()
        .required()
        .transform((value: string) =>
          value.replace(regexRemoveSpecialCharacters, "")
        ),
      number: yup
        .string()
        .length(11)
        .trim()
        .required()
        .transform((value: string) => value.replace(regexOnlyNumber, "")),
      dateBirth: yup
        .string()
        .length(6)
        .trim()
        .required()
        .transform((value: string) => value.replace(regexOnlyNumber, "")),
      description: yup.string().min(1).max(900).trim().required(),
      password: yup.string().min(6).max(72).trim().required(),
      isAdvertiser: yup.boolean().required(),
      address: yup.object().shape({
        zip_code: yup
          .string()
          .length(8)
          .trim()
          .required()
          .transform((value: string) => value.replace(regexOnlyNumber, "")),
        state: yup
          .string()
          .length(2)
          .trim()
          .required()
          .transform((value: string) =>
            value.replace(regexRemoveSpecialCharacters, "")
          ),
        city: yup
          .string()
          .min(2)
          .max(26)
          .trim()
          .required()
          .transform((value: string) =>
            value.replace(regexRemoveSpecialCharacters, "")
          ),
        street: yup.string().min(3).max(26).trim().required(),
        number: yup
          .string()
          .min(1)
          .max(11)
          .trim()
          .required()
          .transform((value: string) => value.replace(regexOnlyNumber, "")),
        complement: yup.string().min(3).max(206).trim().required(),
      }),
    });

  static createUserResponseSchema: yup.SchemaOf<ICreateUserResponse> = yup
    .object()
    .shape({
      address: yup.object().shape({
        createdAt: yup.date().required(),
        updatedAt: yup.date().required(),
        complement: yup.string().trim().required(),
        number: yup.string().trim().required(),
        street: yup.string().trim().required(),
        city: yup.string().trim().required(),
        state: yup.string().trim().required(),
        zip_code: yup.string().trim().required(),
      }),
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
      isActive: yup.boolean().required(),
      isAdvertiser: yup.boolean().required(),
      description: yup.string().required(),
      dateBirth: yup.string().required(),
      number: yup.string().required(),
      cpf: yup.string().required(),
      email: yup.string().required(),
      name: yup.string().required(),
      id: yup.string().required(),
    });

  static getUserIdSchema: yup.SchemaOf<IGetUserIdResponse> = yup
    .object()
    .shape({
      vehicles: yup.array().of(
        yup.object().shape({
          id: yup.string().required(),
          title: yup.string().trim().required(),
          brand: yup.string().trim().required(),
          model: yup.string().trim().required(),
          year: yup.number().required(),
          fuel: yup.string().trim().required(),
          color: yup.string().trim().required(),
          mileage: yup.number().required(),
          price: yup.number().required(),
          description: yup.string().trim().required(),
          coverUrl: yup.string().trim().required(),
          bellowFipe: yup.boolean().required(),
          fipe: yup.string().trim().required(),
          isActive: yup.boolean().required(),
          createdAt: yup.date().required(),
          updatedAt: yup.date().required(),
        })
      ),
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
      isActive: yup.boolean().required(),
      isAdvertiser: yup.boolean().required(),
      description: yup.string().required(),
      dateBirth: yup.string().required(),
      number: yup.string().required(),
      cpf: yup.string().required(),
      email: yup.string().required(),
      name: yup.string().required(),
      id: yup.string().required(),
    });

  static getUsersResponseSchema: yup.SchemaOf<ICreateUserResponse[]> =
    yup.array(this.createUserResponseSchema);

  static updateUserRequestSchema: yup.SchemaOf<IUpdateUserRequest> = yup
    .object()
    .shape({
      name: yup.string().min(3).max(26).trim(),
      email: yup.string().email().min(6).max(72).trim(),
      cpf: yup
        .string()
        .length(11)
        .trim()
        .transform((value: string) =>
          value.replace(regexRemoveSpecialCharacters, "")
        ),
      number: yup
        .string()
        .length(11)
        .trim()
        .transform((value: string) => value.replace(regexOnlyNumber, "")),
      dateBirth: yup
        .string()
        .length(6)
        .trim()
        .transform((value: string) => value.replace(regexOnlyNumber, "")),
      description: yup.string().min(1).max(900).trim(),
      password: yup.string().min(6).max(72).trim(),
      isAdvertiser: yup.boolean(),
    });

  static updateUserResponseSchema: yup.SchemaOf<IUpdateUserResponse> = yup
    .object()
    .shape({
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
      isActive: yup.boolean().required(),
      isAdvertiser: yup.boolean().required(),
      description: yup.string().required(),
      dateBirth: yup.string().required(),
      number: yup.string().required(),
      cpf: yup.string().required(),
      email: yup.string().required(),
      name: yup.string().required(),
      id: yup.string().required(),
    });
}
