// middleware/authorizeRoles.ts
import { RequestHandler } from "express";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
  return async (req, res, next) => {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select("role");
    appAssert(user, UNAUTHORIZED, "User not found", AppErrorCode.InvalidUser);

    appAssert(
      allowedRoles.includes(user.role),
      UNAUTHORIZED,
      "You are not authorized to perform this action",
      AppErrorCode.Forbidden
    );

    next();
  };
};

export default authorizeRoles;
