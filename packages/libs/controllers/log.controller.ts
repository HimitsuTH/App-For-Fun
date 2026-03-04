import { Request, Response, NextFunction } from "express";
import logger from "libs/helpers/winston.helper";

type errorData = {
  statusCode: number;
  message: string;
  field?:string;
};

export const errorHandler = (err: errorData,req: Request,res: Response,next: NextFunction) => {
  const statusCode = (err as any).status || err.statusCode || 500;

  console.log('---------ERROR-------')

  res.status(statusCode).json({
    statusCode: statusCode,
    field: err.field,
    message: err.message,
  });

  logger.error(`err----------${err}`)
};