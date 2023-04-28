import { Request } from "express";
import User from "../models/UserModel";

export default interface MyRequest extends Request {
  user: User;
}
