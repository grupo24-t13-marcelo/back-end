import * as yup from "yup";
import {
  ICreateVehicleRequest,
  ICreateVehicleResponse,
  IUpdateVehicleRequest,
  IUpdateVehicleResponse,
  IGetAllVehicles,
  IgetVehicleById,
} from "../interfaces/vehicle.inetfaces";

export class VehicleSchemas {
  static createVehicleRequestSchemas: yup.SchemaOf<ICreateVehicleRequest> = yup
    .object()
    .shape({
      photos: yup.object().shape({
        photourl: yup.array(),
      }),
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
    });

  static createVehicleResponseSchema: yup.SchemaOf<ICreateVehicleResponse> = yup
    .object()
    .shape({
      photos: yup.array().required(),
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
    });

  static updateVehicleRequestSchemas: yup.SchemaOf<IUpdateVehicleRequest> = yup
    .object()
    .shape({
      title: yup.string().trim(),
      brand: yup.string().trim(),
      model: yup.string().trim(),
      year: yup.number(),
      fuel: yup.string().trim(),
      color: yup.string().trim().required(),
      mileage: yup.number(),
      price: yup.number(),
      description: yup.string().trim(),
      coverUrl: yup.string().trim(),
      bellowFipe: yup.boolean(),
      fipe: yup.string().trim(),
    });

  static getVehicleSchemas: yup.SchemaOf<IGetAllVehicles> = yup.object().shape({
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
    user: yup
      .string()
      .required()
      .transform((value) => value.name),
  });

  static getAllVehicleSchemas: yup.SchemaOf<IGetAllVehicles[]> = yup.array(
    this.getVehicleSchemas
  );

  static getVehicleByIdSchema: yup.SchemaOf<IgetVehicleById> = yup
    .object()
    .shape({
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
      photos: yup.array(),
      comments: yup.array(),
      user: yup.object().shape({
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
      }),
    });
}
