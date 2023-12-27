import { NextFunction, Request, Response } from "express";

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

export const logEvents = async (msg: string, logFileName: string) => {
    const dataTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logMsg = `${dataTime}\t${uuid()}\t${msg}\n`
    console.log(logMsg);
    try {

        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            try {
                await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
            } catch (error) {
                console.error(error);
            }
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logMsg)

    } catch (error) {
        console.error(error);
    }
}

export const logger = (req: Request, res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqlog.txt')
    // logEvents(`${req.method}\t${req.originalUrl}\t${req.url}`, 'reqlog.txt')
    next();
}

