
export interface GetStatus {
    WAIT: string ,
    APPROVED : string ,
    CANCEL : string ,
    BOOKED : string ,

}


const getStatus : GetStatus = {  

    "WAIT" : "WAIT_FOR_APPROVE" , 
    "APPROVED" : "APPROVED" ,
    "CANCEL" : "CANCEL_FORM" ,
    "BOOKED" : "BOOKED" ,



}

export const enum FormStatus {
    WAIT = 'WAIT_FOR_APPROVE',
    APPROVED = "APPROVED" ,
    CANCEL = "CANCEL_FORM" ,
    BOOKED = "BOOKED" ,
}

export const enum CarsStatus {
    READY = "READY_FOR_ORDERS" ,
    BUSY = " WAS_GOING " ,
    DONE = " MISSION_COMPLETE"
}

export const enum DriverStatus {
    READY = "READY_FOR_DRIVE" ,
    BUSY = "DRIVING " ,
    DONE = "MISSION_COMPLETE"
}