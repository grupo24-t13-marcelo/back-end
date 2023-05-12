import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/Errors.helper";
import { userRepository } from "../repositories";

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

  async isAdvertiser(req: Request, res: Response, next: NextFunction) {
    const logedId = req.user.id;
    const findUser = await userRepository.findOne({
      where: { id: logedId },
    });

    if (findUser?.isAdvertiser === false) {
      throw new UnauthorizedError("Restricted for advertisers");
    }

    return next();
  }
}
