import { Error } from "mongoose";

export type TErrorSource = Array<{
    path: string | number;
    message: string;
  }>;
  
export type TGenericErrorResponse = {
  statusCode : number,
  message : string,
  errorSources : TErrorSource

}

export class AppError extends Error{
    public statusCode: number;

    constructor(statusCode: number, message: string, stack=""){
        super(message);
        this.statusCode = statusCode;

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}