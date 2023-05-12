import { ICreateUserResponse } from "./user.interfaces";
import {
  ICreateCommentResponse,
  IReturnComment,
  ICommentUser,
} from "./Comment.interfaces";

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
  color: string;
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
  color: string;
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

export interface IGetAllVehicles
  extends Partial<Omit<ICreateVehicleRequest, "photos">> {
  user: string;
}

export interface IUpdateVehicleRequest
  extends Partial<Omit<ICreateVehicleRequest, "photos">> {}

export interface IUpdateVehicleResponse extends ICreateVehicleResponse {}

export interface ICreateUserResponse2 {
  id: string;
  name: string;
  email: string;
  cpf: string;
  number: string;
  dateBirth: string;
  description: string;
  isAdvertiser: boolean;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface IgetVehicleById {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  color: string;
  mileage: number;
  price: number;
  description: string;
  coverUrl: string;
  bellowFipe: boolean;
  fipe: string;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  photos: IcreatePhotoResponse[];
  comments: ICommentUser[];
  user: ICreateUserResponse2;
}
