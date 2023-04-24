import { Request, Response } from "express";
import { AddressService } from "../services/Address.service";

export class AddressController {
  async update(req: Request, res: Response) {
    const addressUpdated = await new AddressService().update(
      req.body,
      req.user.id
    );
    return res.status(200).json(addressUpdated);
  }
}
