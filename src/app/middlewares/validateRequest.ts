import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { tryCatchAsync } from "../utils/tryCatchAsync";

// validator 
export const validateRequest = (schema: AnyZodObject) => {
    return tryCatchAsync ( async (req: Request, res: Response, next: NextFunction) => {
  
        await schema.parseAsync({
          body: req.body
        });
        next();
  
      });
  };


  