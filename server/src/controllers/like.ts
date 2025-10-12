import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { IReq } from "../types";
import { Like } from "../models";

export const createLike = asyncWrapper(async (req: IReq, res: Response) => {
  const like = await Like.create({ user: req.userId, ...req.body });
  res.status(200).json({ like });
});

export const deleteLike = asyncWrapper(async (req: Request, res: Response) => {
  await Like.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Like deleted Successfully." });
});
