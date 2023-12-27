"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.logEvents = void 0;
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const logEvents = (msg, logFileName) => __awaiter(void 0, void 0, void 0, function* () {
    const dataTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logMsg = `${dataTime}\t${uuid()}\t${msg}\n`;
    console.log(logMsg);
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            try {
                yield fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
            }
            catch (error) {
                console.error(error);
            }
        }
        yield fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logMsg);
    }
    catch (error) {
        console.error(error);
    }
});
exports.logEvents = logEvents;
const logger = (req, res, next) => {
    (0, exports.logEvents)(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqlog.txt');
    // logEvents(`${req.method}\t${req.originalUrl}\t${req.url}`, 'reqlog.txt')
    next();
};
exports.logger = logger;
