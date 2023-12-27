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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
function verifyAccessToken(req, res, next) {
    const header = req.headers['authorization'] || req.headers['Authorization'];
    if (!header) {
        return next(http_errors_1.default.Unauthorized());
    }
    const token = Array.isArray(header) ? header[0].split(' ')[1] : header.split(' ')[1];
    if (accessSecret) {
        jsonwebtoken_1.default.verify(token, accessSecret, (err, payload) => {
            if (err) {
                return next(http_errors_1.default.Unauthorized(err.message));
            }
            req.jwtaccess = payload;
            next();
        });
    }
    else {
        return next(http_errors_1.default.InternalServerError('Access Token Not Found'));
    }
}
exports.verifyAccessToken = verifyAccessToken;
function verifyRefreshToken(req, res, next) {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        return next(http_errors_1.default.Unauthorized());
    }
    const token = cookies.jwt;
    if (refreshSecret) {
        jsonwebtoken_1.default.verify(token, refreshSecret, (err, decodedToken) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return next(http_errors_1.default.Unauthorized());
            }
            req.jwtrefresh = decodedToken.aud;
            next();
        }));
    }
    else {
        return next(http_errors_1.default.InternalServerError('Access Token Not Found'));
    }
}
exports.verifyRefreshToken = verifyRefreshToken;
// const findUser = await User.findById(decodedToken.audience)
// if(!findUser){
//     return next(createHttpError.Unauthorized())
// }
// const newAccessToken = await signAccessToken(findUser._id.toString())
