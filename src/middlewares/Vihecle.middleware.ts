import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repositories";
import { vehicleRepository } from "../repositories";
import { UnauthorizedError } from "../helpers/Errors.helper";

export class VehicleMiddleware {
  async ensureIsOwner(req: Request, res: Response, next: NextFunction) {
    const vehicleId = req.params.id;
    const logedId = req.user.id;

    let status = false;

    const findUser = await userRepository.findOne({
      where: { id: logedId },
      relations: { vehicles: true },
    });

    findUser?.vehicles.forEach((elem) => {
      if (elem.id === vehicleId) {
        status = true;
      }
    });

    if (status === false) {
      throw new UnauthorizedError("You cannot update or delete this vehicle");
    }

    return next();
  }
}
