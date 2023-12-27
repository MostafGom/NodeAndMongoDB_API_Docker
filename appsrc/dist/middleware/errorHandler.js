"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logEvents_1 = require("./logEvents");
const errorHandler = (error, req, res, next) => {
    (0, logEvents_1.logEvents)(`${error.name}:${error.message}`, 'errorlog.txt');
    // console.error(error.stack);
    console.log(error);
    res.status(error.status || 500).json({ error: error.message, data: error === null || error === void 0 ? void 0 : error.details });
};
exports.default = errorHandler;
