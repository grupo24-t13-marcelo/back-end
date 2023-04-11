export interface ICreateUserRequest {
  name: string;
  email: string;
  cpf: string;
  number: string;
  dateBirth: string;
  description: string;
  password: string;
  isAdvertiser: boolean;
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
}
