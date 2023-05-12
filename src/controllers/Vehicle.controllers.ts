import { Request, Response } from "express";
import { VehicleServices } from "../services/Vehicle.services";

export class VehicleController {
  async create(req: Request, res: Response) {
    const newVihecle = await new VehicleServices().create(
      req.body,
      req.user.id
    );
    return res.status(201).json(newVihecle);
  }

  async delete(req: Request, res: Response) {
    await new VehicleServices().delete(req.params.id);
    return res.status(204).send();
  }

  async update(req: Request, res: Response) {
    const vehicleUpdated = await new VehicleServices().update(
      req.body,
      req.user.id,
      req.params.id
    );
    return res.status(200).json(vehicleUpdated);
  }

  async get(req: Request, res: Response) {
    const vehicleGet = await new VehicleServices().get();
    return res.status(200).json(vehicleGet);
  }

  async getById(req: Request, res: Response) {
    const vehicle = await new VehicleServices().getVehicleById(req.params.id);
    return res.status(200).json(vehicle);
  }
}
