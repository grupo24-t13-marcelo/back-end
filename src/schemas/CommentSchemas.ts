import * as yup from "yup";
import {
  ICreateCommentResponse,
  ICreateCommentRequest,
} from "../interfaces/Comment.interfaces";

export class CommentSchemas {
  static createCommentSchemaResponse: yup.SchemaOf<ICreateCommentResponse> = yup
    .object()
    .shape({
      id: yup.string().trim().required(),
      commenttext: yup.string().trim().required(),
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    });

  static createCommentSchemaRequest: yup.SchemaOf<ICreateCommentRequest> = yup
    .object()
    .shape({
      commenttext: yup.string().trim().required(),
    });
}
