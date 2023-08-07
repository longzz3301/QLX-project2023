import express from "express";
import { CheckRoleOperator, CheckToken } from "../middlewares/authorization";
import {
  CreateCars,
  CreateDriver,
  DeleteCar,
  DeleteDriver,
  AddCarsAndDriversForm,
  ListCarsReady,
  GetListDriversAndCarsReady,
  ListForm,
} from "../controllers/operatorControllers";

const OperatorRoute = express.Router();

OperatorRoute.post("/createCars", CheckToken, CheckRoleOperator, CreateCars);

OperatorRoute.post(
  "/createDrivers",
  CheckToken,
  CheckRoleOperator,
  CreateDriver
);

OperatorRoute.delete("/deleteCars", CheckToken, CheckRoleOperator, DeleteCar);

OperatorRoute.delete(
  "/deleteDriver",
  CheckToken,
  CheckRoleOperator,
  DeleteDriver
);

OperatorRoute.get(
  "/getListCarsReady",
  CheckToken,
  CheckRoleOperator,
  ListCarsReady
);

OperatorRoute.get(
  "/getListDriversAndCarsReady",
  CheckToken,
  CheckRoleOperator,
  GetListDriversAndCarsReady
);

OperatorRoute.get("/getListForm", CheckToken, CheckRoleOperator, ListForm);

OperatorRoute.put(
  "/addCarsForm/:id",
  CheckToken,
  CheckRoleOperator,
  AddCarsAndDriversForm
);

// OperatorRoute.put(
//   "/addCarsForm/:id",
//   CheckToken,
//   CheckRoleOperator,
//   GetCarsForm
// );

export default OperatorRoute;
