import { commentsRepository } from "../repositories";
import { vehicleRepository } from "../repositories";
import { userRepository } from "../repositories";
import { ICreateCommentRequest } from "../interfaces/Comment.interfaces";
import { NotFoundError } from "../helpers/Errors.helper";
import { CommentSchemas } from "../schemas/CommentSchemas";
export class CommentService {
  async create(data: ICreateCommentRequest, vehicleId: string, userId: string) {
    const findUser = await userRepository.findOne({
      where: { id: userId },
    });

    const findVehicle = await vehicleRepository.findOne({
      where: { id: vehicleId },
    });

    if (!findVehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    const newComment = commentsRepository.create({
      commenttext: data.commenttext,
      vehicleid: { ...findVehicle },
      ownerid: { ...findUser },
    });

    const dataNewComment = await commentsRepository.save(newComment);

    return await CommentSchemas.createCommentSchemaResponse.validate(
      dataNewComment,
      {
        stripUnknown: true,
      }
    );
  }

  async get(vehicleId: string) {
    const findVehicle = await vehicleRepository.findOne({
      where: { id: vehicleId },
      relations: { comments: true },
    });

    if (!findVehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    return findVehicle;
  }

  async update(data: ICreateCommentRequest, commentId: string) {
    const findComment = await commentsRepository.findOne({
      where: { id: commentId },
    });

    if (!findComment) {
      throw new NotFoundError("Comment not found");
    }

    let commentUpdate = commentsRepository.create({ ...findComment, ...data });
    const commentUpdateReturn = await commentsRepository.save(commentUpdate);

    return commentUpdateReturn;
  }

  async delete(commentId: string) {
    const findComment = await commentsRepository.findOne({
      where: { id: commentId },
    });

    if (!findComment) {
      throw new NotFoundError("Comment not found");
    }

    await commentsRepository.delete({ id: commentId });
  }
}
