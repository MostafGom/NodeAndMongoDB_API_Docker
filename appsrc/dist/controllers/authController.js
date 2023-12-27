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
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = __importDefault(require("http-errors"));
const jwtMethods_1 = require("../helpers/jwtMethods");
const validation_1 = require("../helpers/validation");
require('dotenv').config();
const User_1 = __importDefault(require("../models/User"));
const handleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validation = (0, validation_1.loginValidation)({ email, password });
    if (validation.error) {
        return next((0, http_errors_1.default)(400, { message: 'Invalid Data', details: validation.error.details[0].message }));
    }
    const findUser = yield User_1.default.findOne({ email: email });
    if (!findUser) {
        return next((0, http_errors_1.default)(401, { message: 'Unauthorized user does not exist', details: 'you need to register' }));
    }
    try {
        const match = yield bcrypt_1.default.compare(password, findUser.password);
        if (!match) {
            throw http_errors_1.default.Unauthorized('email/password not valid');
        }
        const accessToken = yield (0, jwtMethods_1.signAccessToken)(findUser._id.toString());
        const refreshToken = yield (0, jwtMethods_1.signRefreshToken)(findUser._id.toString());
        res.cookie('jwt', refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none" });
        res.status(200).json({
            'message': 'user logged in successfully',
            'data': { "accessToken": accessToken }
        });
    }
    catch (error) {
        console.log(error.message);
        return next(http_errors_1.default.InternalServerError());
        // res.status(500).json({ 'message': error.message })
    }
});
const handleRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshJwt = req.jwtrefresh;
    console.log(refreshJwt);
    const findUser = yield User_1.default.findById(refreshJwt);
    if (!findUser) {
        return next((0, http_errors_1.default)(401, { message: 'Unauthorized user does not exist', details: 'you need to register' }));
    }
    try {
        const accessToken = yield (0, jwtMethods_1.signAccessToken)(findUser._id.toString());
        const refreshToken = yield (0, jwtMethods_1.signRefreshToken)(findUser._id.toString());
        res.cookie('jwt', refreshToken, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "none" });
        res.status(200).json({
            'message': 'new access token generated',
            'data': { "accessToken": accessToken }
        });
    }
    catch (error) {
        return next(http_errors_1.default.InternalServerError());
    }
});
exports.default = {
    handleRefreshToken,
    handleLogin,
};
