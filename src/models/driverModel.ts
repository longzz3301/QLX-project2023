import mongoose from "mongoose";
import { DriverStatus } from "../global/statusForm";


mongoose.connect("mongodb://localhost:27017/bookingcarSYSTEM")

const DriverSchema =  new mongoose.Schema({
    Name_of_driver :String ,
    date_of_birth : Date ,
    phone : String ,
    email: String , 
    operatorId: String
    
})

const DriverModel = mongoose.model("drivers" , DriverSchema)

export default DriverModel