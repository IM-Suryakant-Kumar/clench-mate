import type { IUser } from "./user";

export interface SuccessResponse {
  message?: string;
  token?: string;
  user?: IUser; 
}