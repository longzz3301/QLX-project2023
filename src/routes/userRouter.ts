import express from "express";
import { CreateAccount, Login } from "../controllers/userControllers";
import { validate } from "uuid";
import userModel from "../models/usermodel";
import validation from "../middlewares/validation";
import validatorSchema from "../models/validatorSchema";

const userRoute = express.Router();

userRoute.post("/createAccount", CreateAccount);
userRoute.post("/login", Login);

export default userRoute;
