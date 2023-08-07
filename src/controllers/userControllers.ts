import express, { NextFunction, Request, Response } from "express";
import userModel from "../models/usermodel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Obj, RequestMiddleware } from "../global/interface";
import getRoleOffice from "../global/roleOffice";
import GetRoleOffice from "../global/roleOffice";
import { emit } from "process";
import { test } from "node:test";
import { error } from "console";

const CreateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username, phone, age, officeCode } = req.body;
    const checkUserExist = await userModel.findOne({ email: email });
    if (checkUserExist) {
      res.send("user da ton tai");
      next();
    } else {
      const salt = bcrypt.genSaltSync(8);
      const hassPassword = bcrypt.hashSync(password, salt);
      const user = await userModel.create({
        username: username,
        email: email,
        password: hassPassword,
        phone: phone,
        age: age,
        role: getRoleOffice[officeCode as "B9" | "M5" | "A9"],
      });

      res.send("create Succes");
    }
  } catch (error) {
    res.send(error);
  }
};

const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const checkUser = await userModel.findOne({ email: email });
    console.log(checkUser);
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (checkPassword && checkUser) {
      const token = jwt.sign(
        {
          email: checkUser.email,
          UserId: checkUser.id,
          role: checkUser.role,
        },
        "longzz"
      );
      res.send({ token });
    } else {
      res.send("wrong password or username not");
    }
  } catch (error) {
    res.send(error);
  }
};

// export default CreateAccount;
export { CreateAccount, Login };
