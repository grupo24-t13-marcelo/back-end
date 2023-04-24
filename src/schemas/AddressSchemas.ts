import * as yup from "yup";
import { IAddressUpdateRequest } from "../interfaces/address.interfaces";
import { IUserAddressResponse } from "../interfaces/user.interfaces";
import { regexOnlyNumber, regexRemoveSpecialCharacters } from "./utils/regexs";

export class AddressSchemas {
  static updateAddressRequestSchema: yup.SchemaOf<IAddressUpdateRequest> = yup
    .object()
    .shape({
      zip_code: yup
        .string()
        .length(8)
        .trim()
        .transform((value: string) => value.replace(regexOnlyNumber, "")),
      state: yup
        .string()
        .length(2)
        .trim()
        .transform((value: string) =>
          value.replace(regexRemoveSpecialCharacters, "")
        ),
      city: yup
        .string()
        .min(2)
        .max(26)
        .trim()
        .transform((value: string) =>
          value.replace(regexRemoveSpecialCharacters, "")
        ),
      street: yup.string().min(3).max(26).trim(),
      number: yup
        .string()
        .min(1)
        .max(11)
        .trim()
        .transform((value: string) => value.replace(regexOnlyNumber, "")),
      complement: yup.string().min(3).max(206).trim(),
    });

  static updateAddressResponseSchema: yup.SchemaOf<IUserAddressResponse> = yup
    .object()
    .shape({
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
      complement: yup.string().trim().required(),
      number: yup.string().trim().required(),
      street: yup.string().trim().required(),
      city: yup.string().trim().required(),
      state: yup.string().trim().required(),
      zip_code: yup.string().trim().required(),
    });
}
