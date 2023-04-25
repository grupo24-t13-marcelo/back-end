import { ICreateUserResponse } from "./user.interfaces";

export interface ICreatePhotosRequest {
  photourl: string[];
}

export interface IcreatePhoto {
  photourl: string;
}

export interface IcreatePhotoResponse {
  id: string;
  photourl: string;
}

export interface ICreateVehicleRequest {
  title: string;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  mileage: number;
  price: number;
  description: string;
  coverUrl: string;
  bellowFipe: boolean;
  fipe: string;
  photos: ICreatePhotosRequest;
}

export interface ICreateVehicleResponse {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  mileage: number;
  price: number;
  description: string;
  coverUrl: string;
  bellowFipe: boolean;
  fipe: string;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  photos: string[];
}

export interface IUpdateVehicleRequest
  extends Partial<Omit<ICreateVehicleRequest, "photos">> {}

export interface IUpdateVehicleResponse extends ICreateVehicleResponse {}
