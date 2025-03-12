import { Request, Response, NextFunction } from "express";
import { MarketingResponse } from "@dddforum/api/marketing";
import { ServerErrors, ApplicationErrors, CustomError } from "@dddforum/errors";

export function marketingErrorHandler(
  error: CustomError,
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
        code: new ApplicationErrors.ValidationError(error.message),
      },
    };
    return res.status(400).json(responseBody);
  }

  responseBody = {
    success: false,
    data: null,
    error: {
      code: new ServerErrors.ServerErrorException(),
    },
  };

  return res.status(500).json(responseBody);
}
