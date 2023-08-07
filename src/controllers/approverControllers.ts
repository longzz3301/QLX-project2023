import { NextFunction, Request, Response } from "express";
import bookingFormModel from "../models/bookingFormModel";
import { FormStatus } from "../global/statusForm";
import { RequestMiddleware } from "../global/interface";

const GetlistFormWait = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const listWaitApprove = await bookingFormModel.find({
    status: FormStatus.WAIT,
  });
  res.send(listWaitApprove);
};

const AppovedForm = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const FormId = req.params.id;
  const updateStatus = FormStatus.APPROVED;
  const checkForm = await bookingFormModel.findById(FormId);
  console.log(checkForm);
  const opratorName = req.userId;
  if (checkForm) {
    // const oprator = await bookingFormModel.create({})
    const ApprovedStatus = await bookingFormModel.findByIdAndUpdate(
      { _id: FormId },
      { status: updateStatus }
    );
    res.send("approved success");
  } else {
    res.send("not found Form");
  }
};

const CancelForm = async (req: Request, res: Response, next: NextFunction) => {
  const FormId = req.params.id;
  const updateStatus = FormStatus.CANCEL;
  const checkForm = await bookingFormModel.findById(FormId);
  console.log(checkForm);
  if (checkForm) {
    const CancelStatus = await bookingFormModel.findByIdAndUpdate(
      { _id: FormId },
      { status: updateStatus }
    );
    res.send("cancel success");
  } else {
    res.send("not found Form");
  }
};

export { AppovedForm, CancelForm, GetlistFormWait };
