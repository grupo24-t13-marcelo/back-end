// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from "express";
import { ICreateUserRequest } from "../../interfaces/user.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
      };
      validate: ICreateUserRequest;
    }
  }
}
