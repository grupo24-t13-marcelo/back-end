export interface IUserAddressRequest {
  zip_code: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement: string;
}

export interface IVehicleResponse {
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
}

export interface IUserAddressUpdateRequest {
  zip_code?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  complement?: string;
}

export interface IUserAddressResponse extends IUserAddressRequest {
  updatedAt: Date;
  createdAt: Date;
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  cpf: string;
  number: string;
  dateBirth: string;
  description: string;
  password: string;
  isAdvertiser: boolean;
  address: IUserAddressRequest;
}

export interface ICreateUserResponse {
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
  address: IUserAddressResponse;
}

export interface IGetUserIdResponse {
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
  vehicles: IVehicleResponse[];
}

export interface IUpdateUserRequest
  extends Partial<Omit<ICreateUserRequest, "address">> {}

export interface IUpdateUserResponse extends ICreateUserResponse {}
