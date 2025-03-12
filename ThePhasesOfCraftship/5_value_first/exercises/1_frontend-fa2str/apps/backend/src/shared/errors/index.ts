import { NextFunction, Request, Response } from "express";
import { CustomError } from "@dddforum/errors";

export type ErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => Response;

