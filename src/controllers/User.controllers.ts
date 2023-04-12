import { Request, Response } from "express";
import { UserServices } from "../services/User.services.";

export class UserController {
  async create(req: Request, res: Response) {
    const newUser = await new UserServices().create(req.validate);
    return res.status(201).json(newUser);
  }

  async delete(req: Request, res: Response) {
    await new UserServices().delete(req.user.id);
    return res.status(204).send();
  }
}
