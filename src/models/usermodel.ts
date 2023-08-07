const mongoose = require ('mongoose')


interface User {
    username : string;
    email: string ;
    password : string;
    phone:string ;
    age: number ; 
    officeCode : string ;
    role: string ;
    

}

mongoose.connect('mongodb://localhost:27017/bookingcarSYSTEM') ;

const userSchema = new mongoose.Schema({
    username : String ,
    email : String ,
    password: String,
    phone:Number ,
    age:Number,
    office :String ,
    role: String ,
    
    

})

const userModel = mongoose.model("user" ,userSchema)

export default userModel