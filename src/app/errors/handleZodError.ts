import { ZodError, ZodIssue } from "zod"
import { TErrorSource, TGenericErrorResponse } from "./errorTypes"


export const handleZodError = (err: ZodError) : TGenericErrorResponse =>{

    const errorSources : TErrorSource = err.issues.map((issue : ZodIssue)=>{

        return{
            path: issue?.path[issue.path.length-1],
            message: issue.message
        }
    })

    return{
        statusCode: 400,
        message: "Validation Error",
        errorSources
    }
}