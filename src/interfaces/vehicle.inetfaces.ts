import { ICreateUserResponse } from "./user.interfaces";

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
  coverURL: string;
  bellowFipe: boolean;
  fipe: string;
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
  user: ICreateUserResponse;
}

export interface IUpdateVehicleRequest extends Partial<ICreateVehicleRequest> {}

export interface IUpdateVehicleResponse extends ICreateVehicleResponse {}
