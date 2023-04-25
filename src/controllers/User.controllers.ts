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

  async update(req: Request, res: Response) {
    const userUpdated = await new UserServices().update(req.body, req.user.id);
    return res.status(200).json(userUpdated);
  }

  async get(req: Request, res: Response) {
    const getUsers = await new UserServices().get();
    return res.status(200).json(getUsers);
  }

  async getUserById(req: Request, res: Response) {
    const user = await new UserServices().getById(req.params.id);
    return res.status(200).json(user);
  }
}
