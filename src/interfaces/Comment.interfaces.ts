export interface ICreateCommentRequest {
  commenttext: string;
}

export interface ICreateCommentResponse {
  id: string;
  commenttext: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOwnerId {
  id: string;
  name: string;
}

export interface IReturnComment {
  id: string;
  commenttext: string;
  createdAt: Date;
  updatedAt: Date;
  ownerid: IOwnerId;
}

export interface ICommentUser {
  id: string;
  commenttext: string;
  createdAt: Date;
  updatedAt: Date;
  ownerid: IUserCommente;
}

export interface IUserCommente {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  password?: string;
  number?: string;
  dateBirth?: string;
  description?: string;
  isAdvertiser?: boolean;
  isActive?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
  userToken?: null;
}
