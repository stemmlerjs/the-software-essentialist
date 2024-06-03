import { Request, Response, NextFunction } from "express";
import { CustomException } from "../../shared/exceptions";
import { MarketingResponse } from "@dddforum/shared/src/api/marketing";

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
        code: "ValidationError",
      },
    };
    return res.status(400).json(responseBody);
  }

  responseBody = {
    success: false,
    data: null,
    error: {
      code: "ServerError",
    },
  };

  return res.status(500).json(responseBody);
}
