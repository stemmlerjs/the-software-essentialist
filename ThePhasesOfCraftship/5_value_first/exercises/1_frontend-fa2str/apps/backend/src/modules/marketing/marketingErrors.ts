import { Request, Response, NextFunction } from "express";
import { MarketingResponse } from "@dddforum/api/marketing";
import { ServerErrors } from "@dddforum/errors/server";
import { ApplicationErrors } from "@dddforum/errors/application";

// TODO: Change the way I'm handling this. I don't really like it.
export function marketingErrorHandler(
  error: Error,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<MarketingResponse> {

  let responseBody: MarketingResponse;

  if (error.name === "InvalidRequestBodyException") {
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
