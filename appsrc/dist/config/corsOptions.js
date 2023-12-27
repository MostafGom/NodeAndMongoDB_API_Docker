"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const corsWhiteList = ['']
const corsWhiteList = ['http://localhost:4000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (corsWhiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not Allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
exports.default = corsOptions;
