import  mongoose from "mongoose"
import { CarsStatus } from "../global/statusForm";
mongoose.connect("mongodb://localhost:27017/bookingcarSYSTEM");

const CarsSchema = new mongoose.Schema({
    name_cars: String ,
    color: String, 
    typeofcar: String ,
    number_plate : String ,
    // status : {type: String , default: CarsStatus.READY.toString()} ,
    operatorId: String 
    

})

const CarsModel = mongoose.model("cars" , CarsSchema) 

export default CarsModel