import express from "express";
import { CheckRoleApprover, CheckToken } from "../middlewares/authorization";
import {
  AppovedForm,
  CancelForm,
  GetlistFormWait,
} from "../controllers/approverControllers";

const ApproverRoute = express.Router();

ApproverRoute.put(
  "/approvedStatus/:id",
  CheckToken,
  CheckRoleApprover,
  AppovedForm
);
ApproverRoute.patch(
  "/cancelStatus/:id",
  CheckToken,
  CheckRoleApprover,
  CancelForm
);
ApproverRoute.get(
  "/getListWait",
  CheckToken,
  CheckRoleApprover,
  GetlistFormWait
);

export default ApproverRoute;
