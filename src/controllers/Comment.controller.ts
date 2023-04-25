import { Request, Response } from "express";
import { CommentService } from "../services/Comment.service";

export class CommentController {
  async create(req: Request, res: Response) {
    const newComment = await new CommentService().create(
      req.body,
      req.params.id,
      req.user.id
    );
    return res.status(201).json(newComment);
  }

  async get(req: Request, res: Response) {
    const getComments = await new CommentService().get(req.params.id);
    return res.status(200).json(getComments);
  }

  async update(req: Request, res: Response) {
    const updateComment = await new CommentService().update(
      req.body,
      req.params.id
    );
    return res.status(200).json(updateComment);
  }

  async delete(req: Request, res: Response) {
    const deleteComment = await new CommentService().delete(req.params.id);
    return res.status(204).json(deleteComment);
  }
}
