import { NextFunction, RequestHandler ,Response, Request} from "express"


 
export const tryCatchAsync = (fn: RequestHandler) => {   
    return (req: Request, res: Response, next:NextFunction)=>{
        Promise.resolve( fn(req, res, next)).catch(err => next(err))
    }
    
}