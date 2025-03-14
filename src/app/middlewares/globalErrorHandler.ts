
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/error";
import { TErrorSource } from "../errors/errorTypes";
import { handleCastError } from "../errors/handleCastError";
import { handleDuplicateError } from "../errors/handleDuplicateError";
import { handleValidationError } from "../errors/handleValidationError";
import { handleZodError } from "../errors/handleZodError";



export const globalErrorHandler : ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => { 
    

    // default values 
    let statusCode = err.statusCode || 500; 
    let message = err.message || "Something went wrong!";
    let errorSources: TErrorSource = [
        {
            path:'',
            message:'Something went wrong'
        }
    ]

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if(err?.name === 'ValidationError'){
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    else if(err.name == 'CastError'){
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;

    }
    else if(err.code == 11000){
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;

    }
    else if(err instanceof AppError){
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path:'',
                message: err.message
            }
        ]

    }
    else if(err instanceof Error){;
        message = err?.message;
        errorSources = [
            {
                path:'',
                message: err.message
            }
        ]

    }


    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};

