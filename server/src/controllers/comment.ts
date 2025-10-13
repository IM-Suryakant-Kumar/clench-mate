import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { Comment } from "../models";
import { IReq } from "../types";

export const createComment = asyncWrapper(async (req: IReq, res: Response) => {
  const comment = await Comment.create({ author: req.userId, ...req.body });
  res.status(200).json({ comment });
});

export const getComments = asyncWrapper(async (req: Request, res: Response) => {
  const comments = await Comment.find();
  res.status(200).json({ comments });
});

export const updateComment = asyncWrapper(async (req: Request, res: Response) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ comment });
});

export const deleteComment = asyncWrapper(async (req: Request, res: Response) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Comment deleted Successfully." });
});
