import * as yup from "yup";
import {
  ICreateVehicleRequest,
  ICreateVehicleResponse,
  IUpdateVehicleRequest,
  IUpdateVehicleResponse,
} from "../interfaces/vehicle.inetfaces";

export class VehicleSchemas {
  static createVehicleRequestSchemas: yup.SchemaOf<ICreateVehicleRequest> = yup
    .object()
    .shape({
      title: yup.string().trim().required(),
      brand: yup.string().trim().required(),
      model: yup.string().trim().required(),
      year: yup.number().required(),
      fuel: yup.string().trim().required(),
      mileage: yup.number().required(),
      price: yup.number().required(),
      description: yup.string().trim().required(),
      coverUrl: yup.string().trim().required(),
      bellowFipe: yup.boolean().required(),
      fipe: yup.string().trim().required(),
    });

  static updateVehicleRequestSchemas: yup.SchemaOf<IUpdateVehicleRequest> = yup
    .object()
    .shape({
      title: yup.string().trim(),
      brand: yup.string().trim(),
      model: yup.string().trim(),
      year: yup.number(),
      fuel: yup.string().trim(),
      mileage: yup.number(),
      price: yup.number(),
      description: yup.string().trim(),
      coverUrl: yup.string().trim(),
      bellowFipe: yup.boolean(),
      fipe: yup.string().trim(),
    });
}
