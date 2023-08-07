import express, { NextFunction, Request, Response } from "express";
import { RequestMiddleware } from "../global/interface";
import { error } from "console";
import jwt from "jsonwebtoken";
import userModel from "../models/usermodel";

const CheckToken = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token as string, "longzz");
    const { email, userID, role } = decoded as {
      email: string;
      userID: string;
      role: string;
    };

    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      const UserRole = checkUser.role;
      const checkId = checkUser._id;
      req.userId = checkId;
      req.user = checkUser;
      req.role = UserRole;
      next?.();
    } else {
      res.send(error);
    }
  } catch (error) {
    res.send(error);
  }
};

const CheckRoleBooker = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const UserRole = req.role;
  if (UserRole === "PERMISSION_BOOK") {
    next();
  } else {
    return error;
  }
};

const CheckRoleApprover = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const UserRole = req.role;
  if (UserRole === "PERMISSION_APPROVE") {
    next();
  } else {
    return error;
  }
};

const CheckRoleOperator = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const UserRole = req.role;
  if (UserRole === "PERMISSION_MANAGER") {
    next();
  } else {
    return error;
  }
};

export { CheckRoleApprover, CheckRoleOperator, CheckRoleBooker, CheckToken };
