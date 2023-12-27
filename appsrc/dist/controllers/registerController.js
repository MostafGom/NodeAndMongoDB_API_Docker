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
const User_1 = __importDefault(require("../models/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const validation_1 = require("../helpers/validation");
const logEvents_1 = require("../middleware/logEvents");
const handleRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, confirmpassword } = req.body;
    const validation = (0, validation_1.regsiterValidation)({ firstname, lastname, email, password, confirmpassword });
    if (validation.error) {
        // return next(createError(400, 'Invalid Data', validation.error.details[0]))
        return next((0, http_errors_1.default)(400, { message: 'Invalid Data', details: validation.error.details[0] }));
    }
    const userDataObj = validation.value;
    try {
        const ifUserInDB = yield User_1.default.findOne({ email: userDataObj.email });
        if (ifUserInDB) {
            return next((0, http_errors_1.default)(400, 'Email Already Registered'));
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(userDataObj.password, salt);
        const newUser = yield new User_1.default({
            firstname: userDataObj.firstname,
            lastname: userDataObj.lastname,
            email: userDataObj.email,
            password: hashedPassword
        });
        yield newUser.save();
        res.status(201).json({
            'message': 'user registered',
            'data': {
                'userid': newUser._id, 'useremail': newUser.email,
                'firstname': newUser.firstname, 'lastname': newUser.lastname
            }
        });
    }
    catch (error) {
        let erroname = (error === null || error === void 0 ? void 0 : error.name) || 'Unknown Error Name';
        let erromsg = (error === null || error === void 0 ? void 0 : error.message) || 'Internal Server Error';
        (0, logEvents_1.logEvents)(`${erroname} : ${erromsg}`, 'errorlog.txt');
        return (0, http_errors_1.default)(500, erromsg);
    }
});
exports.default = {
    handleRegister
};
