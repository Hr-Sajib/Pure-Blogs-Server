import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "./interface/errorTypes";

export const handleValidationError = (err: mongoose.Error.ValidationError) : TGenericErrorResponse => {
  const errorSources: TErrorSource = Object.entries(err.errors).map(([key, val]) => ({
    path: key, // Extracting key as the path
    message: val.message // Extracting message from validation error
  }));

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
