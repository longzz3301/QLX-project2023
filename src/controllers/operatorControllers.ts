import { NextFunction, Request, Response } from "express";
import CarsModel from "../models/carsModel";
import { RequestMiddleware } from "../global/interface";
import { CarsStatus, DriverStatus, FormStatus } from "../global/statusForm";
import DriverModel from "../models/driverModel";
import bookingFormModel from "../models/bookingFormModel";
import { error } from "console";

const CreateCars = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name_cars, color, typeofcar, number_plate, status } = req.body;
    const checkCars = await CarsModel.findOne({ number_plate: number_plate });
    console.log(checkCars);
    if (checkCars) {
      res.send("cars was exits");
    } else {
      const addCars = await CarsModel.create({
        name_cars: name_cars,
        color: color,
        typeofcar: typeofcar,
        number_plate: number_plate,
        // status: CarsStatus.READY.toString(),
        operatorId: req.userId,
      });
      res.send("create cars success");
    }
  } catch (error) {
    return error;
  }
};

const CreateDriver = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Name_of_driver, age, phone, email, date_of_birth } = req.body;
    const checkDriver = await DriverModel.findOne({
      Name_of_driver,
      email,
      phone,
    });
    console.log(checkDriver);

    if (!checkDriver) {
      const addDrivers = await DriverModel.create({
        Name_of_driver: Name_of_driver,
        date_of_birth: new Date(date_of_birth),
        phone: phone,
        email: email,
        operatorId: req.userId,
      });
      res.send("create drivers success");
    } else {
      res.send("user was exits");
    }
  } catch (error) {
    return error;
  }
};

const DeleteDriver = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  // const Name_of_driver = req.params.username
  const Name_of_driver = req.body.Name_of_driver;
  const checkDrivers = await DriverModel.findOne({
    Name_of_driver: Name_of_driver,
  });
  if (checkDrivers) {
    const Deleteed = await DriverModel.deleteOne({
      Name_of_driver: Name_of_driver,
    });
    res.send("delete success");
  } else {
    res.send("not found driver");
  }
};

const DeleteCar = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const nameCars = req.body.name_cars;
  const checkCars = await CarsModel.findOne({ name_cars: nameCars });
  console.log(checkCars);
  if (checkCars) {
    const DeletedCar = await CarsModel.deleteOne({ name_cars: nameCars });
    res.send("delete success");
  } else {
    res.send("not found cars");
  }
};

// const UpdateDrivers = async (req:RequestMiddleware , res: Response , next: NextFunction) => {
//     const inforDriver = req.body
//     const driverName = req.body.Name_of_driver
//     const checkDriver = await DriverModel.findOne({Name_of_driver:driverName})
//     if (checkDriver) {
//         const Name_of_driver = checkDriver.Name_of_driver

//     }

// }

const ListForm = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const getFormApproved = await bookingFormModel.find({
    status: FormStatus.APPROVED,
  });
  res.send(getFormApproved);
};

const ListCarsReady = async (
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const listCars = await CarsModel.find({ status: CarsStatus.READY });
  res.send(listCars);
};

// const ListDriverReady = async (
//   req: RequestMiddleware,
//   res: Response,
//   next: NextFunction
// ) => {
//   const ListDriverReady = await DriverModel.find({
//     status: DriverStatus.READY,
//   });
//   res.send(ListDriverReady);
// };

const GetListDriversAndCarsReady = async (
  // get list car && driver  Ready
  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const listBooked = await bookingFormModel.find({
    status: FormStatus.BOOKED.toString(),
    start_time: {
      $lt: new Date(req.body.end),
    },
    end_time: {
      $gt: new Date(req.body.start),
    },
  });
  const ListDriverId = listBooked.map((list) => list.driverId); // get list DriverId busy
  const listCarsId = listBooked.map((list) => list.carsId); // get list cars busy
  const ListCarsReady = await CarsModel.find({ _id: { $nin: listCarsId } }); // get list carReady
  const ListDriverReady = await DriverModel.find({
    _id: { $nin: ListDriverId },
  });

  console.log(ListDriverReady);
  res.send(listBooked);
};

const AddCarsAndDriversForm = async (
  // Add cars and driver to form

  req: RequestMiddleware,
  res: Response,
  next: NextFunction
) => {
  const getFormId = req.params.id;
  const checkForm = await bookingFormModel.findById(getFormId);

  const getCarsId = req.body.CarId;
  const getDriversId = req.body.DriverId;
  const checkCars = await CarsModel.findById(getCarsId);
  const checkDriver = await DriverModel.findById(getDriversId);
  if (checkForm && checkCars && checkDriver) {
    // check cars , Form , driver exits in db
    const checkStatus = checkForm?.status;
    if (checkStatus === "APPROVED") {
      // check status form valid
      const listBooked = await bookingFormModel.find({
        status: FormStatus.BOOKED.toString(),
        start_time: {
          $lt: new Date(req.body.end),
        },
        end_time: {
          $gt: new Date(req.body.start),
        },
      });
      const ListDriverId = listBooked.map((list) => list.driverId);
      const listCarsId = listBooked.map((list) => list.carsId);
      const ListCarsReady = await CarsModel.find({ _id: { $nin: listCarsId } });
      const ListDriverReady = await DriverModel.find({
        _id: { $nin: ListDriverId },
      });
      if (ListCarsReady && ListDriverReady) {
        // check cars and driver not busy  // add cars and driver and update status => booked
        const addCarsForm = await bookingFormModel.updateOne(
          { _id: checkForm.id },
          {
            carsId: getCarsId._id,
            driverId: getDriversId._id,
            status: FormStatus.BOOKED.toString(),
          }
        );
        const newForm = await bookingFormModel.findOne({ _id: getFormId });
        res.send(newForm);
      } else {
        res.send("cars or driver invalid");
      }
    } else {
      res.send("status form invalid");
    }
  } else {
    res.send("cars or form or driver not exits");
  }
};

export {
  CreateCars,
  CreateDriver,
  DeleteCar,
  DeleteDriver,
  ListCarsReady,
  GetListDriversAndCarsReady,
  AddCarsAndDriversForm,
  ListForm,
};
