import { ZodError } from "zod";
import { TErrorSource, TGenericErrorResponse } from "./errorTypes";

export const handleDuplicateError = (err : ZodError): TGenericErrorResponse => {

  let extractedValue : string = ''
  const errorMessage = err?.message;
  const match = errorMessage.match(/\{([^}]+)\}/);
  if (match) {
    extractedValue = match[1].split(": ")[1].replace(/"/g, ""); 
  }



  const errorSources: TErrorSource = [
    {
      path: '',
      message: `Already exists: ${extractedValue}`,
    },
  ];

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
