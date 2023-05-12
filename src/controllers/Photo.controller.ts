import { Request, Response } from "express";
import { PhotoService } from "../services/Photo.service";

export class PhotoController {
  async create(req: Request, res: Response) {
    const newPhoto = await new PhotoService().create(req.body, req.params.id);
    return res.status(201).json(newPhoto);
  }

  async update(req: Request, res: Response) {
    const updatePhoto = await new PhotoService().update(
      req.body,
      req.params.id,
      req.user.id
    );
    return res.status(200).json(updatePhoto);
  }

  async delete(req: Request, res: Response) {
    const deletePhoto = await new PhotoService().delete(
      req.params.id,
      req.user.id
    );
    return res.status(204).json(deletePhoto);
  }
}
