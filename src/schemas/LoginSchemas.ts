import * as yup from "yup";
import {
  ILoginRequest,
  ILoginResponse,
  IUserLoginResponse,
} from "../interfaces/login.interfaces";

export class LoginSchemas {
  static loginRequestSchema: yup.SchemaOf<ILoginRequest> = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  static userLoginResponse: yup.SchemaOf<IUserLoginResponse> = yup
    .object()
    .shape({
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
      isActive: yup.boolean().required(),
      isAdvertiser: yup.boolean().required(),
      dateBirth: yup.string().required(),
      description: yup.string().required(),
      number: yup.string().required(),
      cpf: yup.string().required(),
      email: yup.string().required(),
      name: yup.string().required(),
      id: yup.string().required(),
    });

  static LoginResponseSchema: yup.SchemaOf<ILoginResponse> = yup
    .object()
    .shape({
      user: yup.object().concat(this.userLoginResponse),
      token: yup.string().required(),
    });
}
