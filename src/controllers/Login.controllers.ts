import { Request, Response } from "express";
import { LoginServices } from "../services/Login.services";

export class LoginControllers {
  async login(req: Request, res: Response) {
    const session = await new LoginServices().login(req.validate);
    return res.status(200).json(session);
  }
}
