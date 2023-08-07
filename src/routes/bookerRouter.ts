import express from "express";
import BookingCar from "../controllers/bookerControllers";

import { CheckRoleBooker, CheckToken } from "../middlewares/authorization";
const bookerRoute = express.Router();

bookerRoute.post("/bookingCar", CheckToken, CheckRoleBooker, BookingCar);

export default bookerRoute;
