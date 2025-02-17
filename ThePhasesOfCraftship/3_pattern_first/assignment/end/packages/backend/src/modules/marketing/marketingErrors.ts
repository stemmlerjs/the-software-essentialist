import { Request, Response, NextFunction } from "express";
import { CustomException } from "../../shared/exceptions";
import { MarketingResponse } from "@dddforum/shared/src/api/marketing";
import { ServerError, ValidationError } from "@dddforum/shared/src/errors";

export function marketingErrorHandler(
  error: CustomException,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<MarketingResponse> {
  let responseBody: MarketingResponse;
  if (error.type === "InvalidRequestBodyException") {
    responseBody = {
      success: false,
      data: null,
      error: {
        message: error.message,
        code: new ValidationError(error.message),
      },
    };
    return res.status(400).json(responseBody);
  }

  responseBody = {
    success: false,
    data: null,
    error: {
      code: new ServerError(error.message),
    },
  };

  return res.status(500).json(responseBody);
}
