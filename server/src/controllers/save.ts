import { Request, Response } from "express";
import { asyncWrapper } from "../middlewares";
import { IReq } from "../types";
import { Save } from "../models";

export const createSave = asyncWrapper(async (req: IReq, res: Response) => {
  const save = await Save.create({ author: req.userId, ...req.body });
  res.status(200).json({ save });
});

export const deleteSave = asyncWrapper(async (req: Request, res: Response) => {
  await Save.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Save deleted Successfully." });
});
