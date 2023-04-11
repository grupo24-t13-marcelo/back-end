import * as yup from "yup";
import {
  ICreateUserRequest,
  ICreateUserResponse,
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
    });

  static createUserResponseSchema: yup.SchemaOf<ICreateUserResponse> = yup
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
