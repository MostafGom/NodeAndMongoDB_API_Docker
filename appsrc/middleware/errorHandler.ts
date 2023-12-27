import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { logEvents } from "./logEvents";

const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${error.name}:${error.message}`, 'errorlog.txt');
    // console.error(error.stack);
    console.log(error);

    res.status(error.status || 500).json({ error: error.message, data: error?.details });
}

export default errorHandler