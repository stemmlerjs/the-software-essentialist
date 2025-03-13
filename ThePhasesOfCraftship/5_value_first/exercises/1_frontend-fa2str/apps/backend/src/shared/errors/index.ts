import { NextFunction, Request, Response } from "express";
import { CustomError } from "@dddforum/errors/custom";

export type ErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => Response;

