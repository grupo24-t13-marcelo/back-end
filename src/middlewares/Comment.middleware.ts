import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/Errors.helper";
import { userRepository } from "../repositories";

export class CommentMiddleware {
  async ensureIsCommentOwner(req: Request, res: Response, next: NextFunction) {
    const userId = req.user.id;
    const commentId = req.params.id;

    let status = false;

    const findUser = await userRepository.findOne({
      where: { id: userId },
      relations: { comments: true },
    });

    findUser?.comments.forEach((elem) => {
      if (elem.id === commentId) {
        status = true;
      }
    });

    if (status === false) {
      throw new UnauthorizedError("You cannot update or delete this vehicle");
    }

    return next();
  }
}
