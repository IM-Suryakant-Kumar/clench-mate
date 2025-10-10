import { Request } from "express";
import { Schema } from "mongoose";

export interface IReq extends Request {
	userId?: Schema.Types.ObjectId;
}
