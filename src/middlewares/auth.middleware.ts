import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/Errors.helper";

export class AuthMiddleware {
  verify(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedError("Missing headers atutorization");
    }

    const token = authorization.split(" ")[1];

    return jwt.verify(token, process.env.SECRET_KEY!, (error, decoded) => {
      if (error) {
        throw new UnauthorizedError(error.message);
      }

      req.user = {
        id: String(decoded?.sub),
      };

      return next();
    });
  }
}
