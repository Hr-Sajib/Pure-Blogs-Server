import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "./errorTypes";


export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
