import { NextFunction, Request, Response } from "express";
import { CustomException } from "../exceptions";

export type ErrorHandler = (
  error: CustomException,
  req: Request,
  res: Response,
  next: NextFunction,
) => Response;
