import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "./async";
import { UnauthenticatedError } from "../errors";
import { verify } from "jsonwebtoken";
import { IReq } from "../types";
import { Schema } from "mongoose";

export const authenticateUser = asyncWrapper(
	async (req: IReq, res: Response, next: NextFunction) => {
		const token = req.cookies.token;
		if (!token) throw new UnauthenticatedError("Authentication Invalid");
		const { _id } = verify(token, process.env.JWT_SECRET!) as {
			_id: Schema.Types.ObjectId;
		};
		req.userId = _id;
		next();
	}
);
