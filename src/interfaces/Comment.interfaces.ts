export interface ICreateCommentRequest {
  commenttext: string;
}

export interface ICreateCommentResponse {
  id: string;
  commenttext: string;
  createdAt: Date;
  updatedAt: Date;
}
