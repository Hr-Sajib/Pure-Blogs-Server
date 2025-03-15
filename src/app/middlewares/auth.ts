import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import  HttpStatus  from "http-status";
import { tryCatchAsync } from "../utils/tryCatchAsync";
import config from "../config";
import { AppError } from "../errors/error";
import { TUserRole } from "../modules/auth/role.constants";


declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}

export const auth = (...roles : TUserRole[]) => {
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

      const decodedUserRole = (decoded as JwtPayload).role;

      if(roles && !roles.includes(decodedUserRole)){
        throw new AppError(HttpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      // Attach decoded user information to the request object
      req.user = decoded as JwtPayload;
      next();
    });
  });
};
