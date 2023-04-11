export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
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

export interface ILoginResponse {
  token: string;
  user: IUserLoginResponse;
}
