import { Request, Response, NextFunction } from "express";
import { ServerErrors } from "@dddforum/errors/server";
import { ApplicationErrors } from "@dddforum/errors/application";
import { API } from '@dddforum/api/marketing'

// TODO: Change the way I'm handling this. I don't really like it.
export function marketingErrorHandler(
  error: Error,
  _: Request,
  res: Response,
  _next: NextFunction,
): Response<API.AnyMarketingAPIResponse> {

  if (error.name === "InvalidRequestBodyError") {
    return res.status(400).json({
      success: false,
      data: null,
      error: {
        message: error.message,
        code: new ApplicationErrors.ValidationError(error.message),
      },
    });
  }

  // TODO: handle generic server errors - test how
  return res.status(500).json({
    success: false,
    data: null,
    error: {
      code: new ServerErrors.GenericServerError(),
    },
  });
}
