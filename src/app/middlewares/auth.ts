// import { NextFunction, Request, Response } from "express";
// import { AppError } from "../errors/error";
// import { tryCatchAsync } from "../utils/tryCatchAsync";
// import  HttpStatus  from "http-status";
// import jwt from "jsonwebtoken"
// import config from "../config";
// import {JwtPayload} from "jsonwebtoken"



// // validator 
// export const auth = () => {
//     return tryCatchAsync ( async (req: Request, res: Response, next: NextFunction) => {
  
//         const token = (req.headers.authorization)

//         if(!token){
//             throw new AppError(HttpStatus.UNAUTHORIZED, "You are not authorized!")
//         }

//         // check token validaion 
//         const varification = jwt.verify(token, config.jwt_access_secret as string, function(err, decoded){
//             if(err){
//                 throw new AppError(HttpStatus.UNAUTHORIZED, "You are not authorized!")
//             }

//             req.user = decoded as JwtPayload;
//         })
        
//         next();
  
//       });
//   };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import  HttpStatus  from "http-status";
import { tryCatchAsync } from "../utils/tryCatchAsync";
import config from "../config";
import { AppError } from "../errors/error";


declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}

export const auth = () => {
  return tryCatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Get the Authorization header
    const token = req.headers.authorization;

    // console.log("token: ",token)

    // Validate the presence and format of the token
    if (!token) {
      throw new AppError(HttpStatus.UNAUTHORIZED, "You are not authorized!");
    }


    // Verify the token and handle potential errors
    jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(HttpStatus.UNAUTHORIZED, "Invalid or expired token!");
      }

      // Attach decoded user information to the request object
      req.user = decoded as JwtPayload;
      next();
    });
  });
};
