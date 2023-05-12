import { Request, Response, NextFunction } from "express";
import { ApiError } from "../helpers/Errors.helper";

export class UuidMiddleware {
  async ensureValidUuid(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;

    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const isUuid = regexExp.test(id);
    if (!isUuid) {
      throw new ApiError("invalid input syntax for type uuid", 406);
    }

    return next();
  }
}
