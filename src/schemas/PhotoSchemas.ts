import * as yup from "yup";
import {
  IcreatePhoto,
  IcreatePhotoResponse,
} from "../interfaces/vehicle.inetfaces";

export class PhotoSchemas {
  static createPhotoSchemaRequest: yup.SchemaOf<IcreatePhoto> = yup
    .object()
    .shape({
      photourl: yup.string().trim().required(),
    });

  static createPhotoSchemaResponse: yup.SchemaOf<IcreatePhotoResponse> = yup
    .object()
    .shape({
      id: yup.string().trim().required(),
      photourl: yup.string().trim().required(),
    });
}
