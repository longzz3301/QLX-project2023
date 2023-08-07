import express, { NextFunction, Request, Response, request } from "express";
import bookingFormModel from "../models/bookingFormModel";
import { FormStatus } from "../global/statusForm";
import { RequestMiddleware } from "../global/interface";

const BookingCar = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const {
    start_time,
    end_time,
    start_location,
    end_location,
    number_people,
    reason,
  } = req.body;

  const createForm = await bookingFormModel.create({
    start_time: new Date(start_time),
    end_time: new Date(end_time),
    start_location: start_location,
    end_location: end_location,
    status: FormStatus.WAIT.toString(),
    number_people: number_people,
    reason: reason,
    userId: req.userId,
  });
  res.send(createForm);
};

export default BookingCar;
