"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const logEvents_1 = require("../middleware/logEvents");
require('dotenv').config();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
function signAccessToken(userId) {
    return new Promise((resolve, reject) => {
        const payload = {};
        const options = {
            expiresIn: "15s",
            audience: userId
        };
        if (accessSecret) {
            jsonwebtoken_1.default.sign(payload, accessSecret, options, (err, token) => {
                if (err) {
                    console.error(err);
                    (0, logEvents_1.logEvents)(`${err.name} : ${err.message}`, 'errorlog.txt');
                    reject(http_errors_1.default.InternalServerError());
                }
                resolve(token);
            });
        }
        else {
            reject(http_errors_1.default.InternalServerError('Access Token Not Found'));
        }
    });
}
exports.signAccessToken = signAccessToken;
function signRefreshToken(userId) {
    return new Promise((resolve, reject) => {
        const payload = {};
        const options = {
            expiresIn: "1d",
            audience: userId
        };
        if (refreshSecret) {
            jsonwebtoken_1.default.sign(payload, refreshSecret, options, (err, token) => {
                if (err) {
                    console.error(err);
                    (0, logEvents_1.logEvents)(`${err.name} : ${err.message}`, 'errorlog.txt');
                    reject(http_errors_1.default.InternalServerError());
                }
                resolve(token);
            });
        }
        else {
            reject(http_errors_1.default.InternalServerError('Access Token Not Found'));
        }
    });
}
exports.signRefreshToken = signRefreshToken;
