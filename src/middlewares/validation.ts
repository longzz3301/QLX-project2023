import { NextFunction } from "express";
import { AnySchema, Schema } from "yup";
import { Obj } from "../global/interface";


const validation = (schema:AnySchema) =>  async(req: Request,res: Response,next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
    
        })
        next()
        
    } catch (error) {
        return error
        
    }

    
}

export default validation